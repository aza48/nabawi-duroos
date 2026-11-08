/** A Google Maps search for a masjid in Madinah, which opens the maps app on phones. */
export function mapUrl(masjidNameEn: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${masjidNameEn}, Madinah`)}`;
}
