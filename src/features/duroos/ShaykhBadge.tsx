import Image from "next/image";

/** The first given name, without titles: "أ.د. سليمان بن سليم الله الرحيلي" becomes "سليمان". */
export function givenNameAr(nameAr: string): string {
  const words = nameAr
    .replace(/[()]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !/^(الشيخ|الشيخ:|فضيلة|د\.?|أ\.?د\.?|أ\.|الدكتور|الأستاذ|العلامة)$/.test(w));
  return words[0] ?? nameAr;
}

const SIZE = { sm: "size-12 text-lg rounded-xl", md: "size-16 text-xl rounded-2xl", lg: "size-24 text-3xl rounded-3xl md:size-28 md:text-4xl" } as const;

/**
 * A shaykh's photo when one has been added, otherwise his given name in Arabic calligraphy on the
 * MESH green: many of the mashayikh prefer not to be photographed, so the name is the default.
 */
export function ShaykhBadge({ nameAr, photo, size = "md" }: { nameAr: string; photo?: string | null; size?: keyof typeof SIZE }) {
  if (photo) {
    const px = size === "lg" ? 112 : size === "md" ? 64 : 48;
    return <Image src={photo} alt="" width={px} height={px} unoptimized={/^https?:/.test(photo)} className={`${SIZE[size]} shrink-0 object-cover`} />;
  }
  return (
    <span className={`lattice grid shrink-0 place-items-center overflow-hidden bg-brand-deep font-arabic font-bold text-gold-bright ${SIZE[size]}`} aria-hidden="true">
      <span className="ar-text leading-none" style={{ textAlign: "center" }}>{givenNameAr(nameAr)}</span>
    </span>
  );
}
