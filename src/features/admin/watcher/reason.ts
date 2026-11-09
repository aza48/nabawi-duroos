/**
 * The watcher stores its reasons in short technical words (tested, and read by the run log).
 * Editors see them in plain English: what to check and why the post waits for them.
 */
const KIND: Record<string, string> = {
  cancelled: "A cancellation", postponed: "A postponement", moved: "A move", resumed: "A restart",
  guest: "A guest teacher", new_book: "A new book", book_finished: "A finished book", note: "A note", lecture: "A lecture", other: "This kind of post",
};

const PLAIN: [RegExp, (m: RegExpMatchArray) => string][] = [
  [/^channel not trusted$/, () => "From a channel not marked trusted"],
  [/^"([a-z_]+)" always needs a person$/, (m) => `${KIND[m[1]] ?? "This kind of post"} is always checked by a person`],
  [/^no matching lesson$/, () => "Couldn't tell which dars"],
  [/^needs exactly one date$/, () => "No single clear date"],
  [/^date has passed$/, () => "The date has passed"],
  [/^date is more than 30 days away$/, () => "More than 30 days away"],
  [/^lesson isn't held on that day$/, () => "That dars isn't held on that day"],
  [/^confidence (\d+)%$/, () => "Not sure enough to publish on its own"],
  [/^image only$/, () => "A flyer with no text: read the flyer"],
  [/^the Hijri date in the post gives a different day$/, () => "The Hijri date in the post gives a different day"],
  [/^the weekday in the post does not match the date$/, () => "The weekday in the post doesn't match the date"],
  [/^the post does not name the shaykh clearly$/, () => "The post doesn't name the shaykh clearly"],
  [/^Shadow mode: would have published automatically$/, () => "Would have gone live on its own (automatic publishing is off for this channel)"],
  [/^Trusted channel, clear change$/, () => "Trusted channel, clear change"],
];

export function plainReason(reason: string): string {
  return reason
    .replace("image only; a person must read the flyer", "image only")
    .split("; ")
    .map((part) => {
      for (const [re, say] of PLAIN) {
        const m = part.match(re);
        if (m) return say(m);
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(". ");
}
