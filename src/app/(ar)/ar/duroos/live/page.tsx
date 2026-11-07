import { liveRoute } from "@/features/duroos/routes";

const r = liveRoute("ar");
export const revalidate = 60;
export const metadata = r.metadata;
export default r.Page;
