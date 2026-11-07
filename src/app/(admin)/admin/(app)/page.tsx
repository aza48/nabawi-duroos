import { requireAdmin } from "@/server/auth/session";

export default async function Inbox() {
  const actor = await requireAdmin();
  return <h1 className="text-2xl font-semibold">Assalamu alaykum, {actor.name.split(" ")[0]}</h1>;
}
