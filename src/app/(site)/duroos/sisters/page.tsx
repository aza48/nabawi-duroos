import { sistersRoute } from "@/features/duroos/SistersPage";

const r = sistersRoute("en");
export const revalidate = 300;
export const metadata = r.metadata;
export default r.Page;
