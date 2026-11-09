/** "bookUrl" reads as "Book link", "titleAr" as "Title (Arabic)", ["facts", 0, "en"] as "Facts (English)": editors never see code names. */
export function fieldLabel(path: (string | number)[]): string {
  const parts = path.filter((p): p is string => typeof p === "string");
  let key = parts[parts.length - 1] ?? "";
  let lang = "";
  // A nested { en, ar } pair: the language is the last part, the field is the one before it.
  if ((key === "en" || key === "ar") && parts.length > 1) {
    lang = key === "en" ? " (English)" : " (Arabic)";
    key = parts[parts.length - 2];
  } else if (/[a-z](En|Ar)$/.test(key)) {
    lang = /En$/.test(key) ? " (English)" : " (Arabic)";
    key = key.slice(0, -2);
  }
  if (!key) return "Input";
  const words = key.replace(/Url$/i, " link").replace(/Html$/, "").replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase().trim();
  return (words.charAt(0).toUpperCase() + words.slice(1) || "Input") + lang;
}
