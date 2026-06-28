import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Entrar" };

export default function LoginPage() {
  return <AuthShell title="Que bom ter você de volta." description="Entre para ver o panorama das suas finanças e continuar de onde parou."><Suspense fallback={<div className="h-80 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />}><LoginForm /></Suspense></AuthShell>;
}
