"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth";

export default function ForgotPasswordPage() {
  const { resetPassword, configured } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  async function submit(event: React.FormEvent) { event.preventDefault(); setStatus("loading"); setError(null); try { await resetPassword(email.trim()); setStatus("sent"); } catch (cause) { setError(cause instanceof Error ? cause.message : "Não foi possível enviar o e-mail."); setStatus("idle"); } }
  return <AuthShell title="Recupere seu acesso." description="Enviaremos um link seguro para você criar uma nova senha.">{status === "sent" ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100"><CheckCircle2 className="mb-3 size-6" /><p className="font-semibold">E-mail enviado</p><p className="mt-1 opacity-80">Confira sua caixa de entrada e também a pasta de spam.</p><Link href="/auth/login" className="mt-5 inline-block font-semibold underline">Voltar para o login</Link></div> : <form onSubmit={submit} className="space-y-5">{error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-200">{error}</p>}<div className="space-y-2"><Label htmlFor="email">E-mail da conta</Label><Input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} /></div><Button className="h-12 w-full rounded-xl" disabled={!configured || status === "loading"}>{status === "loading" && <LoaderCircle className="mr-2 size-4 animate-spin" />}Enviar link de recuperação</Button></form>}</AuthShell>;
}
