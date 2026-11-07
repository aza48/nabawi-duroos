import Link from "next/link";
import { ArrowUpRight, Baby, CalendarCheck, Check, Laptop, MapPin, Star, User, UserRound, Users, Wallet } from "lucide-react";
import { PageBand } from "@/components/ui";
import { Tabs } from "@/components/Tabs";
import { VideoEmbed } from "@/components/VideoEmbed";
import { PROGRAMS, PROGRAM_KINDS, type Audience, type Program } from "@/content/programs";
import { JsonLd, breadcrumbs } from "@/components/JsonLd";
import { abs } from "@/lib/site";

const AUDIENCE: Record<Audience, { label: string; icon: typeof User }> = {
  men: { label: "Brothers", icon: User },
  women: { label: "Sisters", icon: UserRound },
  children: { label: "Children", icon: Baby },
  online: { label: "Online", icon: Laptop },
  families: { label: "Families", icon: Users },
};

const checkedOn = (iso: string) => new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(new Date(iso));

function AudienceChips({ p, light = false }: { p: Program; light?: boolean }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {p.audience.map((a) => {
        const { label, icon: Icon } = AUDIENCE[a];
        return (
          <span key={a} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${light ? "bg-white/12 text-white" : "bg-bg-2 text-ink"}`}>
            <Icon size={12} /> {label}
          </span>
        );
      })}
    </span>
  );
}

export function ProgramsIndex() {
  const featured = PROGRAMS.find((p) => p.recommended)!;
  return (
    <>
      <PageBand title="Study in Madinah" subtitle="Arabic institutes, degrees, sisters' marakiz and the halaqat of the Haram, compared side by side." />
      <div className="shell mt-10 md:mt-14">
        <Link href={`/programs/${featured.slug}`} className="lattice group relative block overflow-hidden rounded-3xl bg-brand-deep p-6 text-white shadow-[var(--shadow-lg)] md:p-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-bright px-3 py-1 text-xs font-bold text-brand-deep">
            <Star size={13} fill="currentColor" /> Our first recommendation
          </span>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <h2 className="font-heading text-3xl font-bold leading-tight md:text-5xl">{featured.name}</h2>
              <p className="ar-text mt-1 text-xl text-white/80">{featured.nameAr}</p>
              <p className="mt-4 max-w-xl text-white/85 md:text-lg">{featured.tagline}</p>
              <div className="mt-5"><AudienceChips p={featured} light /></div>
            </div>
            <div className="space-y-3 text-sm md:text-base">
              <p className="flex gap-2"><Wallet size={18} className="mt-0.5 shrink-0 text-gold-bright" /> {featured.price}</p>
              <p className="flex gap-2"><MapPin size={18} className="mt-0.5 shrink-0 text-gold-bright" /> {featured.where}</p>
              <p className="flex gap-2"><CalendarCheck size={18} className="mt-0.5 shrink-0 text-gold-bright" /> Next intake: 21 January to 20 February 2027</p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-bold text-brand-deep transition group-hover:bg-gold-bright">
                See everything about MAP <ArrowUpRight size={17} />
              </span>
            </div>
          </div>
        </Link>

        {PROGRAM_KINDS.map((k) => {
          const items = PROGRAMS.filter((p) => p.kind === k.id && !p.recommended);
          if (!items.length) return null;
          return (
            <section key={k.id} className="mt-14">
              <h2 className="mb-5 font-heading text-2xl font-bold md:text-3xl">{k.label}</h2>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {items.map((p) => (
                  <Link key={p.slug} href={`/programs/${p.slug}`} className="group flex flex-col rounded-2xl border border-line bg-card p-5 transition-colors hover:border-primary/50">
                    <span className="font-heading text-lg font-semibold leading-snug group-hover:text-primary">{p.name}</span>
                    <span className="ar-text text-[15px] text-muted">{p.nameAr}</span>
                    <span className="mt-2 text-sm leading-relaxed text-muted">{p.tagline}</span>
                    <span className="mt-4"><AudienceChips p={p} /></span>
                    <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary">
                      <Wallet size={15} /> {p.price}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
        <p className="mt-12 rounded-2xl bg-bg-2 p-5 text-sm text-muted">
          Fees and dates change. Every page shows when MESH last checked it. Confirm with the institute before you pay, and tell us in the WhatsApp group if something has changed.
        </p>
      </div>
    </>
  );
}

function List({ items, numbered = false }: { items: string[]; numbered?: boolean }) {
  return (
    <ol className="space-y-3">
      {items.map((x, i) => (
        <li key={x} className="flex gap-3">
          <span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${numbered ? "bg-primary text-primary-ink" : "bg-primary-soft text-primary"}`}>
            {numbered ? i + 1 : <Check size={14} />}
          </span>
          <span className="pt-0.5 leading-relaxed">{x}</span>
        </li>
      ))}
    </ol>
  );
}

export function ProgramPage({ p }: { p: Program }) {
  const tabs = [
    { id: "overview", label: "Overview", content: <div className="max-w-3xl space-y-4 text-[1.05rem] leading-relaxed">{p.overview.map((x) => <p key={x}>{x}</p>)}</div> },
    ...(p.levels ? [{ id: "levels", label: "Levels", content: <div className="max-w-3xl"><List items={p.levels} /></div> }] : []),
    ...(p.included ? [{ id: "fees", label: "Fees and what's included", content: <div className="max-w-3xl"><p className="mb-5 font-heading text-2xl font-bold">{p.price}</p><List items={p.included} /></div> }] : []),
    ...(p.steps ? [{ id: "apply", label: "How to apply", content: <div className="max-w-3xl"><List items={p.steps} numbered /></div> }] : []),
    ...(p.videos?.length ? [{ id: "videos", label: `Videos (${p.videos.length})`, content: <div className="grid gap-5 md:grid-cols-2">{p.videos.map((v) => <VideoEmbed key={v.id} id={v.id} title={v.title} />)}</div> }] : []),
  ];
  const ld = {
    "@context": "https://schema.org",
    "@type": p.kind === "degree" ? "EducationalOccupationalProgram" : "Course",
    name: p.name,
    alternateName: p.nameAr,
    description: [p.tagline, ...p.overview].join(" "),
    url: abs(`/programs/${p.slug}`),
    provider: { "@type": "EducationalOrganization", name: p.name, address: { "@type": "PostalAddress", addressLocality: "Madinah", addressCountry: "SA" }, ...(p.contact?.[0]?.href.startsWith("http") ? { url: p.contact[0].href } : {}) },
    inLanguage: ["ar", "en"],
    offers: { "@type": "Offer", description: p.price, category: p.price.toLowerCase().startsWith("free") ? "Free" : "Paid" },
    dateModified: p.checked,
    ...(p.videos?.length ? { video: p.videos.map((v) => ({ "@type": "VideoObject", name: v.title, embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`, thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`, uploadDate: p.checked, description: v.title })) } : {}),
  };
  return (
    <>
      <JsonLd data={[ld, breadcrumbs([["Study in Madinah", "/programs"], [p.name, `/programs/${p.slug}`]])]} />
      <section className="lattice overflow-hidden bg-brand text-white">
        <div className="shell py-10 md:py-14">
          <Link href="/programs" className="text-sm text-white/75 hover:text-white">Study in Madinah</Link>
          {p.recommended && (
            <span className="ms-3 inline-flex items-center gap-1 rounded-full bg-gold-bright px-2.5 py-0.5 text-xs font-bold text-brand-deep align-middle">
              <Star size={12} fill="currentColor" /> Recommended
            </span>
          )}
          <h1 className="mt-3 font-heading text-4xl font-bold leading-[1.05] md:text-6xl">{p.name}</h1>
          <p className="ar-text mt-2 text-2xl text-white/80">{p.nameAr}</p>
          <p className="mt-4 max-w-2xl text-white/85 md:text-lg">{p.tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm md:text-base">
            <AudienceChips p={p} light />
            <span className="flex items-center gap-1.5"><Wallet size={17} className="text-gold-bright" /> {p.price}</span>
            <span className="flex items-center gap-1.5"><MapPin size={17} className="text-gold-bright" /> {p.where}</span>
          </div>
        </div>
      </section>
      <div className="shell mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        <Tabs tabs={tabs} />
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {p.contact?.length ? (
            <div className="rounded-3xl border border-line bg-card p-5">
              <p className="font-heading text-lg font-bold">Contact and links</p>
              <ul className="mt-3 space-y-2">
                {p.contact.map((c) => (
                  <li key={c.href}>
                    <a href={c.href} target={c.href.startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer" className="flex items-center justify-between gap-2 rounded-xl bg-bg-2 px-3.5 py-2.5 text-sm font-semibold transition hover:bg-primary hover:text-primary-ink">
                      {c.label} <ArrowUpRight size={15} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <p className="rounded-2xl bg-bg-2 p-4 text-xs leading-relaxed text-muted">
            Last checked by MESH: {checkedOn(p.checked)}. Fees and dates change, so confirm with the institute before paying.
          </p>
        </aside>
      </div>
    </>
  );
}
