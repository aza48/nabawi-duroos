import { todayRoute } from "@/features/duroos/routes";

const r = todayRoute("en");
export const revalidate = 60;
export const metadata = r.metadata;
export default r.Page;
