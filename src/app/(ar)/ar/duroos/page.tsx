import { todayRoute } from "@/features/duroos/routes";

const r = todayRoute("ar");
export const revalidate = 60;
export const metadata = r.metadata;
export default r.Page;
