"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfigAlert } from "@/components/config-alert";

function friendlyAuthError(error: unknown) {
  const message = error instanceof Error ? error.message : "Não foi possível entrar.";
  if (message.toLowerCase().includes("invalid login")) return "E-mail ou senha incorretos.";
  if (message.toLowerCase().includes("email not confirmed")) return "Confirme seu e-mail antes de entrar.";
  return message;
}

export function LoginForm() {
  const { signIn, configured, user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const confirmed = searchParams.get("cadastro") === "confirmar-email";

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [loading, user, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!email.trim() || !password) return setError("Preencha e-mail e senha.");
    setSubmitting(true);
    try {
      await signIn(email.trim().toLowerCase(), password);
      router.replace("/dashboard");
      router.refresh();
    } catch (cause) {
      setError(friendlyAuthError(cause));
    } finally {
      setSubmitting(false);
    }
  }

  return <form onSubmit={handleSubmit} className="space-y-5" noValidate>
    {!configured && <ConfigAlert />}
    {confirmed && <div className="flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"><CheckCircle2 className="size-5 shrink-0" />Conta criada. Abra o link enviado ao seu e-mail e depois entre aqui.</div>}
    {error && <div role="alert" className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"><AlertCircle className="size-5 shrink-0" />{error}</div>}
    <div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" value={email} onChange={e => setEmail(e.target.value)} disabled={submitting} /></div>
    <div className="space-y-2"><div className="flex justify-between"><Label htmlFor="password">Senha</Label><Link href="/auth/forgot-password" className="text-xs font-medium text-gold-600 hover:underline dark:text-gold-300">Esqueci minha senha</Link></div><Input id="password" name="password" type="password" autoComplete="current-password" placeholder="Sua senha" value={password} onChange={e => setPassword(e.target.value)} disabled={submitting} /></div>
    <Button className="h-12 w-full rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-gold-400 dark:text-black dark:hover:bg-gold-300" disabled={submitting || !configured}>{submitting ? <><LoaderCircle className="mr-2 size-4 animate-spin" />Entrando…</> : <>Entrar <ArrowRight className="ml-2 size-4" /></>}</Button>
    <p className="text-center text-sm text-zinc-500">Ainda não tem conta? <Link href="/auth/signup" className="font-semibold text-zinc-950 hover:underline dark:text-white">Comece grátis</Link></p>
  </form>;
}
