import { notFound } from "@/server/api";

/** Unknown /api/v1 addresses answer in the same JSON envelope as every other reply, not with the HTML 404 page. */
const missing = async () => notFound();

export const GET = missing;
export const POST = missing;
export const PUT = missing;
export const PATCH = missing;
export const DELETE = missing;
