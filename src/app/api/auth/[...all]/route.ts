import { getAuth, handleAuthRequest } from "@/server/auth/auth";

export const dynamic = "force-dynamic";

async function handle(req: Request) {
  return handleAuthRequest(await getAuth(), req);
}

export { handle as GET, handle as POST };
