import { liveRoute } from "@/features/duroos/routes";

const r = liveRoute("en");
export const revalidate = 60;
export const metadata = r.metadata;
export default r.Page;
