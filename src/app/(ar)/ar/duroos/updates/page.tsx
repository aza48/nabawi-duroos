import { updatesRoute } from "@/features/duroos/routes";

const r = updatesRoute("ar");
export const revalidate = 60;
export const metadata = r.metadata;
export default r.Page;
