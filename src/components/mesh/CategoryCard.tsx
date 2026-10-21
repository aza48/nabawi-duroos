"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { meshCategories } from "@/data/mesh-seed";
import { useMeshPrefs, pickLang } from "@/lib/mesh-i18n";

const CARD_TAGS: Record<string, string[]> = {
  "getting-started": ["University admission", "Visa and Iqama", "Nafath", "Absher", "University registration"],
  "getting-settled": ["Accommodation", "Transport", "SIM cards", "Banking", "Groceries and essentials"],
  "getting-ready-to-leave": ["Exit procedures", "Travel", "Final paperwork", "Accommodation handover", "Closing accounts"],
};

function Media({ slug }: { slug: string }) {
  if (slug === "getting-started") return (
    <div className="mesh-cat-logos" aria-hidden>
      {/* Real app icons published by the National Information Center on the Apple App Store (Absher / Nafath) */}
      <img className="mesh-cat-logo" src="/images/mesh/absher.jpg" alt="" width={512} height={512} />
      <img className="mesh-cat-logo" src="/images/mesh/nafath.jpg" alt="" width={512} height={512} />
    </div>
  );
  if (slug === "getting-settled") return <img className="mesh-cat-photo" src="/images/mesh/madinah-city.jpg" alt="" width={1024} height={768} aria-hidden />;
  return <img className="mesh-cat-photo" src="/images/mesh/departure.jpg" alt="" width={1024} height={672} aria-hidden />;
}

export default function CategoryCard({ slug, variant = "card" }: { slug: string; variant?: "card" | "header" }) {
  const { lang, t } = useMeshPrefs();
  const cat = meshCategories.find((c) => c.slug === slug);
  if (!cat) return null;
  const name = pickLang(lang, cat.name, cat.nameAr);
  const desc = pickLang(lang, cat.description, cat.descriptionAr);
  // English title keeps the two-tone treatment (last word in bright green); Arabic shows the full localized name.
  const words = cat.name.split(" ");
  const inner = (
    <>
      <div className="mesh-cat-media"><Media slug={slug} /></div>
      <div className="mesh-cat-tint" aria-hidden />
      <div className="mesh-cat-glass" aria-hidden />
      <div className="mesh-cat-edge" aria-hidden />
      <div className="mesh-cat-content">
        <h2 className="mesh-cat-title" style={variant === "header" ? { fontSize: 30 } : undefined}>
          {lang === "ar" ? name : (<>{words.slice(0, -1).join(" ")}{words.length > 1 ? " " : ""}<span className="mesh-accent-text">{words[words.length - 1]}</span></>)}
        </h2>
        <p className="mesh-cat-desc">{desc}</p>
        <div className="mesh-cat-tags">{(CARD_TAGS[slug] || []).map((tg) => <span key={tg} className="mesh-cat-tag">{tg}</span>)}</div>
        {variant === "card" && (
          <span style={{ display: "inline-flex", gap: 8, alignItems: "center", marginTop: 16, fontWeight: 600, fontSize: 14 }}>
            {t("home.explore")} <span className="mesh-arrow"><ArrowRight size={16} className="mesh-flip-rtl" /></span>
          </span>
        )}
      </div>
    </>
  );
  const mod = slug === "getting-started" ? " mesh-cat--logos" : "";
  if (variant === "header") return <div className={`mesh-cat-card mesh-cat-card-header${mod}`}>{inner}</div>;
  return <Link href={`/mesh/category/${slug}`} className={`mesh-cat-card mesh-focus${mod}`} aria-label={name}>{inner}</Link>;
}
