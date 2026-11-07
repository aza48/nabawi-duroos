import { getAuth } from "@/server/auth/auth";

export const dynamic = "force-dynamic";

async function handle(req: Request) {
  return (await getAuth()).handler(req);
}

export { handle as GET, handle as POST };
