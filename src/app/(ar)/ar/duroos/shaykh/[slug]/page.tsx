import { shaykhRoute } from "@/features/duroos/routes";

const r = shaykhRoute("ar");
export const revalidate = 300;
export const generateMetadata = r.generateMetadata;
export const generateStaticParams = r.generateStaticParams;
export default r.Page;
