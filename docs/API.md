# MESH public API (`/api/v1`)

Read-only JSON for the site and a future native app. No key is needed. Every reply uses one envelope:

```json
{ "data": ..., "error": null, "generatedAt": "2026-11-08T18:00:00.000Z", "version": 1 }
```

On failure `data` is null and `error` is a short code (`not_found`, `bad_request`, with a `message` for bad input). Successful replies are cached for 60 seconds at the edge, so compute "live now" on the device from `liveFrom` and `liveUntil`, not from `phase`.

## Duroos

| Endpoint | What it returns |
| --- | --- |
| `GET /duroos/today` | The day's duroos with prayer times. `?date=YYYY-MM-DD` gives another day within 60 days. |
| `GET /duroos/schedule` | The weekly grid: `byDay` (0 Sunday to 6 Saturday) and `daysNotStated`. |
| `GET /duroos/lessons` | Every dars. Filters: `?shaykh=<slug>`, `?masjid=<id>`, `?prayer=<fajr\|dhuhr\|asr\|maghrib\|isha>`, `?status=active`. |
| `GET /duroos/lessons/<slug>` | One dars with its recent changes (`history`), stream and channels. |
| `GET /duroos/shaykhs` | Every shaykh. |
| `GET /duroos/shaykhs/<slug>` | One shaykh with his current duroos (`lessons`), earlier ones and channels. |
| `GET /duroos/masjids` | The masjids. |
| `GET /duroos/streams` | Broadcast channels and whether each is live now. |
| `GET /duroos/announcements` | Current updates. `?limit=` up to 100, `?archived=1` for the full history. |
| `GET /calendar/<feed>.ics` | iCalendar feeds: `all`, `dates`, `shaykh-<slug>`, `masjid-<id>`, `lesson-<slug>`. |

### A dars in `today`

```json
{
  "slug": "ruh-dalil", "prayer": "asr",
  "timeKnown": true,
  "adhanAt": "2026-11-12T12:14:00.000Z",
  "liveFrom": "2026-11-12T12:34:00.000Z", "liveUntil": "2026-11-12T13:44:00.000Z",
  "phase": "upcoming", "status": "on",
  "shaykh": { "slug": "...", "nameEn": "...", "nameAr": "...", "photo": null },
  "masjid": { "id": "nabawi", "nameEn": "...", "nameAr": "...", "shortEn": "...", "shortAr": "..." },
  "bookEn": "...", "bookAr": "...", "locationEn": "...", "locationAr": "...",
  "overrideNoteEn": null, "overrideNoteAr": null, "stream": null, "audience": "all"
}
```

- `timeKnown` false means the dars is held in the evening but no prayer time is confirmed: show no adhan time, countdown or live badge for it, and expect no calendar event.
- `status` is `on`, `cancelled`, `postponed`, `moved`, `guest` or `resumed` for that day.
- `phase` is `upcoming`, `live` or `done` at `generatedAt`; recompute it on the device.
- `hijri` on the day carries `en`, `ar`, `day`, `month` and `year`; `weekday` is 0 (Sunday) to 6.

### A dars in `lessons`, `schedule` and `shaykhs/<slug>`

Fields: `slug`, `shaykh`, `masjid`, `bookEn`, `bookAr`, `bookAuthorEn`, `bookAuthorAr`, `bookUrl`, `topic`, `prayer`, `timeKnown`, `timeLabelEn`, `timeLabelAr`, `prayerNoteEn`, `prayerNoteAr`, `sequenceEn`, `sequenceAr`, `noteEn`, `noteAr`, `days` (weekday numbers), `daysLabelEn`, `daysLabelAr`, `frequencyEn`, `frequencyAr`, `locationEn`, `locationAr`, `audience` (`all`, `men`, `women`), `status` (`active`, `paused`, `finished`), `validFrom`, `validTo`. Free-text labels are null when there is nothing fit to show.

## Other endpoints

`GET /guides`, `GET /faqs`, `GET /search`, `GET /weather`, `GET /settings`: used by the site itself. `POST /push/subscribe` and `POST /push/unsubscribe` take a browser push subscription plus topics (`all`, `daily`, `shaykh:<slug>`); `POST /track` is the site's own anonymous analytics. Both write endpoints are rate limited per address.
