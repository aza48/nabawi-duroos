import { updatesRoute } from "@/features/duroos/routes";

const r = updatesRoute("en");
export const revalidate = 60;
export const metadata = r.metadata;
export default r.Page;
