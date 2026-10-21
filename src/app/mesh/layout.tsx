import type { Metadata } from "next";
import "./mesh.css";
import MeshShell from "@/components/mesh/MeshShell";
import { MeshPrefsProvider, MeshRoot } from "@/lib/mesh-i18n";

export const metadata: Metadata = { title: "MESH — Medinah English Students Hub", description: "Practical answers, local knowledge, and advice from students in Madinah." };

export default function MeshLayout({ children }: { children: React.ReactNode }) {
  return (
    <MeshPrefsProvider>
      <MeshRoot>
        <MeshShell>{children}</MeshShell>
      </MeshRoot>
    </MeshPrefsProvider>
  );
}
