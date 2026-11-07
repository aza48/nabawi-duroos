import { scheduleRoute } from "@/features/duroos/routes";

const r = scheduleRoute("en");
export const revalidate = 300;
export const metadata = r.metadata;
export default r.Page;
