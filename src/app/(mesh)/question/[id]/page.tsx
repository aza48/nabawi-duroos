import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuestionView from "@/components/mesh/QuestionView";
import JsonLd from "@/components/JsonLd";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { meshSeedQuestions } from "@/data/mesh-seed";
import { abs } from "@/lib/site";

export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/* Server-side resolution of a question for metadata + structured    */
/* data. Mirrors the visibility rules of GET /api/mesh/questions/[id]:*/
/* a deleted thread is a 404 for everyone except its author and       */
/* admins; deleted answers are hidden (the accepted one survives      */
/* only as a placeholder in the UI, never in structured data).        */
/* ------------------------------------------------------------------ */

type SeoAnswer = {
  text: string;
  dateCreated: string;
  upvoteCount: number;
  authorName: string;
};

type QuestionSeo = {
  title: string;
  body: string;
  createdAt: string;
  voteCount: number;
  authorName: string;
  categorySlug: string;
  categoryName: string;
  answerCount: number;
  acceptedAnswer: SeoAnswer | null;
  suggestedAnswers: SeoAnswer[];
};

type Resolution =
  | { state: "found"; data: QuestionSeo }
  | { state: "hidden" } // exists but not public for this viewer — render the client view untouched, emit nothing
  | { state: "missing" }; // definitively nothing there → real 404

function iso(d: string): string {
  const t = new Date(d);
  return isNaN(t.getTime()) ? d : t.toISOString();
}

function toAnswer(a: { body: string; created_at: string; vote_count: number; author_name: string }): SeoAnswer {
  return {
    text: a.body.trim(),
    dateCreated: iso(a.created_at),
    upvoteCount: a.vote_count,
    authorName: a.author_name,
  };
}

type QRow = {
  id: number; title: string; body: string; author_id: number; author_name: string;
  category_slug: string; category_name: string; accepted_answer_id: number | null;
  deleted_at: string | null; created_at: string; vote_count: number;
};

type ARow = {
  id: number; body: string; author_name: string; created_at: string;
  vote_count: number; deleted: boolean;
};

const resolveQuestion = cache(async (id: number): Promise<Resolution> => {
  if (dbConfigured()) {
    let row: QRow | null = null;
    try {
      await ensureMesh();
      row = await queryOne<QRow>(
        `SELECT qq.id, qq.title, qq.body, qq.author_id, u.display_name AS author_name,
           COALESCE(pc.slug, c.slug) AS category_slug, COALESCE(pc.name, c.name) AS category_name,
           qq.accepted_answer_id, qq.deleted_at, qq.created_at,
           (SELECT count(*)::int FROM mesh_votes v WHERE v.target_type='question' AND v.target_id=qq.id) AS vote_count
         FROM mesh_questions qq
         JOIN mesh_users u ON u.id = qq.author_id
         JOIN mesh_categories c ON c.id = qq.category_id
         LEFT JOIN mesh_categories pc ON pc.id = c.parent_id
         WHERE qq.id = $1`,
        [id]
      );
    } catch {
      // Database unreachable: fabricate nothing, block nothing — the
      // client view resolves its own data exactly as before.
      return { state: "hidden" };
    }
    if (row) {
      if (row.deleted_at) {
        // Deleted threads stay visible only to their author and admins.
        const viewer = await getCurrentUser().catch(() => null);
        if (viewer && (viewer.id === row.author_id || viewer.role === "admin")) {
          return { state: "hidden" };
        }
        return { state: "missing" };
      }
      const answers = await query<ARow>(
        `SELECT a.id, a.body, u.display_name AS author_name, a.created_at,
           (a.deleted_at IS NOT NULL) AS deleted,
           (SELECT count(*)::int FROM mesh_votes v WHERE v.target_type='answer' AND v.target_id=a.id) AS vote_count
         FROM mesh_answers a JOIN mesh_users u ON u.id = a.author_id
         WHERE a.question_id = $1 AND (a.deleted_at IS NULL OR a.id = $2)
         ORDER BY (a.id = $2) DESC NULLS LAST, vote_count DESC, a.created_at ASC`,
        [id, row.accepted_answer_id ?? -1]
      ).catch(() => [] as ARow[]);
      const acceptedRow = answers.find((a) => a.id === row.accepted_answer_id && !a.deleted) ?? null;
      const visible = answers.filter((a) => !a.deleted);
      return {
        state: "found",
        data: {
          title: row.title,
          body: row.body,
          createdAt: iso(row.created_at),
          voteCount: row.vote_count,
          authorName: row.author_name,
          categorySlug: row.category_slug,
          categoryName: row.category_name,
          answerCount: visible.length,
          acceptedAnswer: acceptedRow ? toAnswer(acceptedRow) : null,
          suggestedAnswers: visible.filter((a) => a.id !== row.accepted_answer_id).map(toAnswer),
        },
      };
    }
    // No row in the database: fall through to the seed, exactly like the
    // client view does when the API answers 404.
  }

  const seed = meshSeedQuestions.find((q) => q.id === id);
  if (seed) {
    const accepted = seed.answers.find((a) => a.id === seed.acceptedAnswerId) ?? null;
    return {
      state: "found",
      data: {
        title: seed.title,
        body: seed.body,
        createdAt: iso(seed.createdAt),
        voteCount: seed.voteCount,
        authorName: seed.authorName,
        categorySlug: seed.categorySlug,
        categoryName: seed.categoryName,
        answerCount: seed.answers.length,
        acceptedAnswer: accepted
          ? { text: accepted.body.trim(), dateCreated: iso(accepted.createdAt), upvoteCount: accepted.voteCount, authorName: accepted.authorName }
          : null,
        suggestedAnswers: seed.answers
          .filter((a) => a.id !== seed.acceptedAnswerId)
          .map((a) => ({ text: a.body.trim(), dateCreated: iso(a.createdAt), upvoteCount: a.voteCount, authorName: a.authorName })),
      },
    };
  }
  return { state: "missing" };
});

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = parseInt(params.id, 10);
  if (!id) return {};
  const res = await resolveQuestion(id);
  if (res.state !== "found") return {};
  const d = res.data;
  const description = d.body.replace(/\s+/g, " ").trim().slice(0, 160);
  const title = `${d.title} — MESH`;
  const url = abs(`/question/${id}`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: d.createdAt,
    },
  };
}

function answerLd(a: SeoAnswer) {
  return {
    "@type": "Answer",
    text: a.text,
    dateCreated: a.dateCreated,
    upvoteCount: a.upvoteCount,
    author: { "@type": "Person", name: a.authorName },
  };
}

export default async function QuestionPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (!id) notFound();
  const res = await resolveQuestion(id);
  if (res.state === "missing") notFound();

  let jsonLd: object[] | null = null;
  if (res.state === "found") {
    const d = res.data;
    const qaLd = {
      "@context": "https://schema.org",
      "@type": "QAPage",
      mainEntity: {
        "@type": "Question",
        name: d.title,
        text: d.body.trim(),
        answerCount: d.answerCount,
        upvoteCount: d.voteCount,
        dateCreated: d.createdAt,
        author: { "@type": "Person", name: d.authorName },
        ...(d.acceptedAnswer ? { acceptedAnswer: answerLd(d.acceptedAnswer) } : {}),
        ...(d.suggestedAnswers.length ? { suggestedAnswer: d.suggestedAnswers.map(answerLd) } : {}),
      },
    };
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
        { "@type": "ListItem", position: 2, name: d.categoryName, item: abs(`/category/${d.categorySlug}`) },
        { "@type": "ListItem", position: 3, name: d.title, item: abs(`/question/${id}`) },
      ],
    };
    jsonLd = [qaLd, breadcrumbLd];
  }

  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}
      <QuestionView id={id} />
    </>
  );
}
