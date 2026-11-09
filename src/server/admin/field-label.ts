/** "bookUrl" reads as "Book link", "titleAr" as "Title (Arabic)": editors never see code names. */
export function fieldLabel(path: (string | number)[]): string {
  const key = String(path[path.length - 1] ?? "");
  if (!key) return "Input";
  const lang = /En$/.test(key) ? " (English)" : /Ar$/.test(key) ? " (Arabic)" : "";
  const words = key.replace(/(En|Ar)$/, "").replace(/Url$/i, " link").replace(/Html$/, "").replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase().trim();
  return (words.charAt(0).toUpperCase() + words.slice(1) || "Input") + lang;
}
