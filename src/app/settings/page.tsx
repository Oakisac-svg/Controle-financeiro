"use client";

import { useState } from "react";
import { Laptop, LoaderCircle, LockKeyhole, Moon, Save, Sun } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useTheme, type Theme } from "@/context/theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/useToast";

export default function SettingsPage() {
  const { profile, user, updateProfile, resetPassword } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [name, setName] = useState(profile?.full_name ?? "");
  const [income, setIncome] = useState(String(profile?.monthly_income ?? 0));
  const [saving, setSaving] = useState(false);
  async function save(event: React.FormEvent) { event.preventDefault(); const value = Number(income); if (value < 0) return toast({ variant: "destructive", title: "Renda inválida" }); setSaving(true); try { await updateProfile({ full_name: name.trim(), monthly_income: value }); toast({ variant: "success", title: "Perfil atualizado" }); } catch (cause) { toast({ variant: "destructive", title: "Não foi possível atualizar", description: cause instanceof Error ? cause.message : "Tente novamente." }); } finally { setSaving(false); } }
  async function recover() { if (!user?.email) return; try { await resetPassword(user.email); toast({ variant: "success", title: "E-mail enviado", description: "Confira sua caixa de entrada para alterar a senha." }); } catch (cause) { toast({ variant: "destructive", title: "Não foi possível enviar", description: cause instanceof Error ? cause.message : "Tente novamente." }); } }
  const choices: { value: Theme; label: string; icon: typeof Sun }[] = [{value:"light",label:"Claro",icon:Sun},{value:"dark",label:"Escuro",icon:Moon},{value:"system",label:"Sistema",icon:Laptop}];
  return <div className="max-w-4xl space-y-7"><div><p className="text-sm text-zinc-500">Sua conta</p><h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Configurações</h1><p className="mt-2 text-sm text-zinc-500">Preferências e dados pessoais em um só lugar.</p></div><section className="rounded-3xl border border-zinc-200 bg-white p-5 sm:p-7 dark:border-zinc-800 dark:bg-zinc-950"><h2 className="font-display text-xl font-semibold">Perfil financeiro</h2><p className="mt-1 text-sm text-zinc-500">A renda mensal ajuda o FinMb a contextualizar suas análises.</p><form onSubmit={save} className="mt-6 grid gap-5 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="name">Nome completo</Label><Input id="name" value={name} onChange={e=>setName(e.target.value)} /></div><div className="space-y-2"><Label htmlFor="income">Renda mensal estimada</Label><Input id="income" type="number" min="0" step="0.01" value={income} onChange={e=>setIncome(e.target.value)} /></div><div className="sm:col-span-2"><Button disabled={saving}>{saving ? <LoaderCircle className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}Salvar alterações</Button></div></form></section><section className="rounded-3xl border border-zinc-200 bg-white p-5 sm:p-7 dark:border-zinc-800 dark:bg-zinc-950"><h2 className="font-display text-xl font-semibold">Aparência</h2><p className="mt-1 text-sm text-zinc-500">Escolha como o FinMb aparece neste dispositivo.</p><div className="mt-6 grid gap-3 sm:grid-cols-3">{choices.map(({value,label,icon:Icon})=><button key={value} onClick={()=>setTheme(value)} className={`flex items-center gap-3 rounded-2xl border p-4 text-sm font-semibold ${theme === value ? "border-gold-400 bg-gold-50 dark:bg-gold-400/10" : "border-zinc-200 dark:border-zinc-800"}`}><Icon className="size-5 text-gold-500" />{label}</button>)}</div></section><section className="rounded-3xl border border-zinc-200 bg-white p-5 sm:p-7 dark:border-zinc-800 dark:bg-zinc-950"><div className="flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-zinc-100 dark:bg-zinc-900"><LockKeyhole className="size-5" /></span><div className="flex-1"><h2 className="font-display text-xl font-semibold">Segurança</h2><p className="mt-1 text-sm leading-6 text-zinc-500">Enviaremos um link seguro para {user?.email}. A senha nunca é exposta ao FinMb.</p><Button variant="outline" className="mt-5" onClick={recover}>Enviar link para alterar senha</Button></div></div></section></div>;
}
