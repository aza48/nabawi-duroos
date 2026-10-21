import type { Metadata } from "next";
import "./mesh.css";
import MeshShell from "@/components/mesh/MeshShell";

export const metadata: Metadata = { title: "MESH — Medinah English Students Hub", description: "Practical answers, local knowledge, and advice from students in Madinah." };

export default function MeshLayout({ children }: { children: React.ReactNode }) {
  return (<div dir="ltr" lang="en" className="mesh-root"><MeshShell>{children}</MeshShell></div>);
}
