import { bigint, boolean, date, index, integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export type LessonStatus = "active" | "paused" | "finished";
export type OverrideKind =
  | "cancelled" | "postponed" | "moved" | "resumed" | "guest" | "new_book" | "book_finished" | "note";
export type OverrideOrigin = "admin" | "watcher_auto" | "watcher_approved" | "legacy";
export type AnnouncementStatus = "draft" | "published" | "archived";
export type ContentStatus = "draft" | "published";
export type StreamKind = "youtube" | "mixlr" | "telegram" | "web";
export type GuideStage = "getting-started" | "getting-settled" | "study" | "family" | "leaving";
export type Bilingual = { en: string; ar: string };

const created = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();
const updated = () => timestamp("updated_at", { withTimezone: true }).notNull().defaultNow();

export const masjids = pgTable("masjids", {
  id: text("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameAr: text("name_ar").notNull(),
  shortEn: text("short_en").notNull(),
  shortAr: text("short_ar").notNull(),
  mapUrl: text("map_url"),
  sort: integer("sort").notNull().default(0),
});

export const shaykhs = pgTable("shaykhs", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  nameEn: text("name_en").notNull(),
  nameAr: text("name_ar").notNull(),
  photo: text("photo"),
  roleEn: text("role_en"),
  roleAr: text("role_ar"),
  facts: jsonb("facts").$type<Bilingual[]>().notNull().default([]),
  createdAt: created(),
});

export const lessons = pgTable(
  "lessons",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    shaykhId: integer("shaykh_id").notNull().references(() => shaykhs.id),
    masjidId: text("masjid_id").notNull().references(() => masjids.id),
    bookEn: text("book_en").notNull(),
    bookAr: text("book_ar").notNull(),
    bookAuthorEn: text("book_author_en"),
    bookAuthorAr: text("book_author_ar"),
    topic: text("topic").notNull(),
    prayer: text("prayer").$type<"fajr" | "dhuhr" | "asr" | "maghrib" | "isha">().notNull(),
    days: integer("days").array().notNull().default([]),
    daysLabelEn: text("days_label_en"),
    daysLabelAr: text("days_label_ar"),
    frequencyEn: text("frequency_en"),
    frequencyAr: text("frequency_ar"),
    timeLabelEn: text("time_label_en"),
    timeLabelAr: text("time_label_ar"),
    prayerNoteEn: text("prayer_note_en"),
    prayerNoteAr: text("prayer_note_ar"),
    locationEn: text("location_en").notNull(),
    locationAr: text("location_ar").notNull(),
    noteEn: text("note_en"),
    noteAr: text("note_ar"),
    sequenceEn: text("sequence_en"),
    sequenceAr: text("sequence_ar"),
    status: text("status").$type<LessonStatus>().notNull().default("active"),
    validFrom: date("valid_from"),
    validTo: date("valid_to"),
    sort: integer("sort").notNull().default(0),
  },
  (t) => [index("lessons_shaykh_idx").on(t.shaykhId), index("lessons_masjid_idx").on(t.masjidId)]
);

export const lessonOverrides = pgTable(
  "lesson_overrides",
  {
    id: serial("id").primaryKey(),
    lessonId: integer("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
    kind: text("kind").$type<OverrideKind>().notNull(),
    startsOn: date("starts_on").notNull(),
    endsOn: date("ends_on").notNull(),
    noteEn: text("note_en"),
    noteAr: text("note_ar"),
    sourceUrl: text("source_url"),
    origin: text("origin").$type<OverrideOrigin>().notNull(),
    createdAt: created(),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
  },
  (t) => [index("overrides_lesson_dates_idx").on(t.lessonId, t.startsOn, t.endsOn)]
);

export const announcements = pgTable(
  "announcements",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    shaykhId: integer("shaykh_id").references(() => shaykhs.id),
    guestNameEn: text("guest_name_en"),
    guestNameAr: text("guest_name_ar"),
    lessonId: integer("lesson_id").references(() => lessons.id),
    masjidId: text("masjid_id").references(() => masjids.id),
    type: text("type").notNull(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    bodyEn: text("body_en").notNull(),
    bodyAr: text("body_ar").notNull(),
    eventDate: date("event_date"),
    imageUrl: text("image_url"),
    sourceHandle: text("source_handle"),
    sourceUrl: text("source_url"),
    postedAt: timestamp("posted_at", { withTimezone: true }).notNull().defaultNow(),
    status: text("status").$type<AnnouncementStatus>().notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
  },
  (t) => [index("announcements_status_idx").on(t.status, t.postedAt)]
);

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  masjidId: text("masjid_id").references(() => masjids.id),
  kind: text("kind").notNull(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  shaykhEn: text("shaykh_en"),
  shaykhAr: text("shaykh_ar"),
  hijriLabelEn: text("hijri_label_en").notNull(),
  hijriLabelAr: text("hijri_label_ar").notNull(),
  prayerLabelEn: text("prayer_label_en"),
  prayerLabelAr: text("prayer_label_ar"),
  startsOn: date("starts_on").notNull(),
  endsOn: date("ends_on").notNull(),
  sourceUrl: text("source_url"),
});

export const streams = pgTable("streams", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  labelEn: text("label_en").notNull(),
  labelAr: text("label_ar").notNull(),
  kind: text("kind").$type<StreamKind>().notNull(),
  url: text("url").notNull(),
  checkUrl: text("check_url"),
  shaykhId: integer("shaykh_id").references(() => shaykhs.id),
  masjidId: text("masjid_id").references(() => masjids.id),
  isLive: boolean("is_live").notNull().default(false),
  liveUrl: text("live_url"),
  checkedAt: timestamp("checked_at", { withTimezone: true }),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  question: text("question").notNull(),
  answerHtml: text("answer_html").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array().notNull().default([]),
  status: text("status").$type<ContentStatus>().notNull().default("draft"),
  lastVerifiedAt: timestamp("last_verified_at", { withTimezone: true }),
  createdAt: created(),
  updatedAt: updated(),
});

export const guides = pgTable("guides", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  bodyHtml: text("body_html").notNull(),
  stage: text("stage").$type<GuideStage>().notNull(),
  coverUrl: text("cover_url"),
  readingMinutes: integer("reading_minutes").notNull().default(1),
  status: text("status").$type<ContentStatus>().notNull().default("draft"),
  lastVerifiedAt: timestamp("last_verified_at", { withTimezone: true }),
  createdAt: created(),
  updatedAt: updated(),
});

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
});

/* ---------- Admin authentication (Better Auth) ----------
   Field set matches what Better Auth reports for: email+password,
   twoFactor, admin, passkey plugins and database rate limiting. */

const ts = (name: string) => timestamp(name, { withTimezone: true });

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: ts("created_at").notNull().defaultNow(),
  updatedAt: ts("updated_at").notNull().defaultNow(),
  twoFactorEnabled: boolean("two_factor_enabled").default(false),
  role: text("role").default("editor"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: ts("ban_expires"),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: ts("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: ts("created_at").notNull().defaultNow(),
    updatedAt: ts("updated_at").notNull().defaultNow(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
  },
  (t) => [index("session_user_idx").on(t.userId)]
);

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: ts("access_token_expires_at"),
  refreshTokenExpiresAt: ts("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: ts("created_at").notNull().defaultNow(),
  updatedAt: ts("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: ts("expires_at").notNull(),
  createdAt: ts("created_at").notNull().defaultNow(),
  updatedAt: ts("updated_at").notNull().defaultNow(),
});

export const twoFactor = pgTable("two_factor", {
  id: text("id").primaryKey(),
  secret: text("secret").notNull(),
  backupCodes: text("backup_codes").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  verified: boolean("verified").default(false),
  failedVerificationCount: integer("failed_verification_count").default(0),
  lockedUntil: ts("locked_until"),
});

export const passkey = pgTable("passkey", {
  id: text("id").primaryKey(),
  name: text("name"),
  publicKey: text("public_key").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  credentialID: text("credential_id").notNull(),
  counter: integer("counter").notNull(),
  deviceType: text("device_type").notNull(),
  backedUp: boolean("backed_up").notNull(),
  transports: text("transports"),
  createdAt: ts("created_at"),
  aaguid: text("aaguid"),
});

export const rateLimit = pgTable("rate_limit", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  count: integer("count").notNull(),
  lastRequest: bigint("last_request", { mode: "number" }).notNull(),
});

export const adminInvites = pgTable("admin_invites", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  role: text("role").notNull(),
  tokenHash: text("token_hash").notNull().unique(),
  invitedBy: text("invited_by").references(() => user.id, { onDelete: "set null" }),
  expiresAt: ts("expires_at").notNull(),
  usedAt: ts("used_at"),
  createdAt: ts("created_at").notNull().defaultNow(),
});

export const auditLog = pgTable(
  "audit_log",
  {
    id: serial("id").primaryKey(),
    actorId: text("actor_id").references(() => user.id, { onDelete: "set null" }),
    actorName: text("actor_name"),
    action: text("action").notNull(),
    entity: text("entity").notNull(),
    entityId: text("entity_id").notNull(),
    before: jsonb("before"),
    after: jsonb("after"),
    createdAt: ts("created_at").notNull().defaultNow(),
    undoneAt: ts("undone_at"),
    undoOf: integer("undo_of"),
  },
  (t) => [index("audit_created_idx").on(t.createdAt)]
);

/* ---------- Channel watcher ---------- */

export type PostStatus = "new" | "ignored" | "suggested" | "published" | "dismissed" | "error";

export const sources = pgTable("sources", {
  handle: text("handle").primaryKey(),
  name: text("name").notNull(),
  trusted: boolean("trusted").notNull().default(true),
  autoPublish: boolean("auto_publish").notNull().default(false),
  lastCheckedAt: timestamp("last_checked_at", { withTimezone: true }),
  lastError: text("last_error"),
});

export const channelPosts = pgTable(
  "channel_posts",
  {
    id: serial("id").primaryKey(),
    sourceHandle: text("source_handle").notNull().references(() => sources.handle),
    postId: text("post_id").notNull().unique(),
    url: text("url").notNull(),
    text: text("text").notNull(),
    imageUrl: text("image_url"),
    postedAt: timestamp("posted_at", { withTimezone: true }).notNull(),
    textHash: text("text_hash").notNull(),
    status: text("status").$type<PostStatus>().notNull().default("new"),
    parse: jsonb("parse"),
    wouldAuto: boolean("would_auto").notNull().default(false),
    reason: text("reason"),
    overrideId: integer("override_id"),
    decidedBy: text("decided_by"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("channel_posts_status_idx").on(t.status, t.postedAt)]
);

/** The latest "live broadcast started" notice per lesson. */
export const lessonLive = pgTable("lesson_live", {
  lessonSlug: text("lesson_slug").primaryKey(),
  url: text("url").notNull(),
  postUrl: text("post_url").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
});
