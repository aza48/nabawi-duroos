import { lessonRoute } from "@/features/duroos/routes";

const r = lessonRoute("ar");
export const revalidate = 60;
export const generateMetadata = r.generateMetadata;
export const generateStaticParams = r.generateStaticParams;
export default r.Page;
