"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowRight, LoaderCircle } from "lucide-react";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfigAlert } from "@/components/config-alert";

export function SignupForm() {
  const { signUp, configured, user, loading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmation: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [loading, user, router]);

  function setField(field: keyof typeof form, value: string) { setForm(current => ({ ...current, [field]: value })); }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (form.name.trim().length < 2) return setError("Informe seu nome completo.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("Informe um e-mail válido.");
    if (form.password.length < 8) return setError("A senha precisa ter pelo menos 8 caracteres.");
    if (form.password !== form.confirmation) return setError("As senhas não coincidem.");
    setSubmitting(true);
    try {
      const needsConfirmation = await signUp(form.email.trim().toLowerCase(), form.password, form.name);
      router.replace(needsConfirmation ? "/auth/login?cadastro=confirmar-email" : "/dashboard");
      router.refresh();
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Não foi possível criar sua conta.";
      setError(message.toLowerCase().includes("already registered") ? "Este e-mail já está cadastrado." : message);
    } finally { setSubmitting(false); }
  }

  return <form onSubmit={handleSubmit} className="space-y-4" noValidate>
    {!configured && <ConfigAlert />}
    {error && <div role="alert" className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"><AlertCircle className="size-5 shrink-0" />{error}</div>}
    <div className="space-y-2"><Label htmlFor="name">Nome completo</Label><Input id="name" autoComplete="name" placeholder="Como podemos chamar você?" value={form.name} onChange={e => setField("name", e.target.value)} disabled={submitting} /></div>
    <div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" value={form.email} onChange={e => setField("email", e.target.value)} disabled={submitting} /></div>
    <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="password">Senha</Label><Input id="password" type="password" autoComplete="new-password" placeholder="Mínimo 8 caracteres" value={form.password} onChange={e => setField("password", e.target.value)} disabled={submitting} /></div><div className="space-y-2"><Label htmlFor="confirmation">Confirmar senha</Label><Input id="confirmation" type="password" autoComplete="new-password" placeholder="Repita a senha" value={form.confirmation} onChange={e => setField("confirmation", e.target.value)} disabled={submitting} /></div></div>
    <p className="text-xs leading-5 text-zinc-500">Ao criar sua conta, você concorda em usar o FinMb de forma responsável e manter seus dados de acesso seguros.</p>
    <Button className="h-12 w-full rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-gold-400 dark:text-black dark:hover:bg-gold-300" disabled={submitting || !configured}>{submitting ? <><LoaderCircle className="mr-2 size-4 animate-spin" />Criando conta…</> : <>Criar conta gratuita <ArrowRight className="ml-2 size-4" /></>}</Button>
    <p className="text-center text-sm text-zinc-500">Já tem uma conta? <Link href="/auth/login" className="font-semibold text-zinc-950 hover:underline dark:text-white">Entrar</Link></p>
  </form>;
}
