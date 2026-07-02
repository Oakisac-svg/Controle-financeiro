"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Apple, Bot, ChevronDown, CircleDollarSign, Goal, LayoutDashboard, ListChecks, LogOut, Menu, Moon, Repeat2, Settings, Sun, Utensils, WalletCards, X } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useTheme } from "@/context/theme";
import { cn } from "@/lib/utils";
import { PageLoading } from "@/components/ui/page-loading";
import { BrandLogo } from "@/components/brand-logo";

const navigation = [
  { label: "Principal", items: [
    { href: "/dashboard", label: "Visão geral", icon: LayoutDashboard },
    { href: "/finbot", label: "FinBot", icon: Bot },
  ]},
  { label: "Finanças", items: [
    { href: "/finance", label: "Finanças", icon: CircleDollarSign },
    { href: "/transactions", label: "Transações", icon: WalletCards },
    { href: "/goals", label: "Metas", icon: Goal },
  ]},
  { label: "Rotina", items: [
    { href: "/routine", label: "Minha rotina", icon: Repeat2 },
    { href: "/routine/habits", label: "Hábitos", icon: CircleDollarSign },
    { href: "/routine/tasks", label: "Tarefas", icon: ListChecks },
  ]},
  { label: "Alimentação", items: [
    { href: "/nutrition", label: "Visão nutricional", icon: Apple },
    { href: "/nutrition/meals", label: "Refeições", icon: Utensils },
  ]},
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, signOut } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!loading && !user) router.replace("/auth/login"); }, [loading, user, router]);
  async function logout() { await signOut(); router.replace("/"); router.refresh(); }
  if (loading || !user) return <main className="mx-auto min-h-screen max-w-6xl p-6 pt-24"><PageLoading /></main>;
  const initials = (profile?.full_name || user.email || "F").split(" ").map(item => item[0]).join("").slice(0, 2).toUpperCase();
  const activeLabel = navigation.flatMap(group => group.items).find(item => pathname === item.href)?.label ?? "FinMb";

  return <div className="min-h-screen bg-[#f7f7f5] dark:bg-[#080808]">
    {open && <button aria-label="Fechar menu" className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />}
    <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-[276px] flex-col border-r border-zinc-200/80 bg-white/95 p-4 shadow-2xl shadow-black/5 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 lg:shadow-none dark:border-white/10 dark:bg-[#0d0d0d]/95", open ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex h-14 items-center justify-between px-2"><BrandLogo href="/dashboard" className="text-lg" imageClassName="size-10" /><button className="rounded-lg p-2 lg:hidden" onClick={() => setOpen(false)} aria-label="Fechar menu"><X className="size-5" /></button></div>
      <nav className="mt-5 flex-1 space-y-5 overflow-y-auto pr-1">{navigation.map(group => <section key={group.label}><p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-zinc-400">{group.label}</p><div className="space-y-1">{group.items.map(({ href, label, icon: Icon }) => { const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`)); return <Link key={href} href={href} onClick={() => setOpen(false)} className={cn("group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all", active ? "bg-zinc-950 text-white shadow-lg shadow-black/10 dark:bg-gold-400 dark:text-black dark:shadow-gold-400/10" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/[.06] dark:hover:text-white")}><Icon className={cn("size-[17px]", active && "text-gold-300 dark:text-black")} />{label}</Link>; })}</div></section>)}</nav>
      <Link href="/settings" className="mb-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/[.06]"><Settings className="size-[17px]" />Configurações</Link>
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-3 dark:border-white/10 dark:bg-white/[.035]"><div className="flex items-center gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-xs font-bold text-black">{initials}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">{profile?.full_name || "Sua conta"}</p><p className="truncate text-[10px] text-zinc-500">{user.email}</p></div><ChevronDown className="size-3.5 text-zinc-400" /></div><button onClick={logout} className="mt-2 flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] font-medium text-zinc-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"><LogOut className="size-3.5" />Sair da conta</button></div>
    </aside>
    <div className="lg:pl-[276px]"><header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-zinc-200/80 bg-[#f7f7f5]/80 px-4 backdrop-blur-xl sm:px-7 dark:border-white/10 dark:bg-[#080808]/80"><button onClick={() => setOpen(true)} className="rounded-xl border border-zinc-200 bg-white p-2 lg:hidden dark:border-white/10 dark:bg-zinc-900" aria-label="Abrir menu"><Menu className="size-5" /></button><div><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-zinc-400">Espaço pessoal</p><p className="text-xs font-semibold">{activeLabel}</p></div><div className="ml-auto flex items-center gap-2"><span className="hidden items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-[10px] font-semibold text-emerald-600 sm:flex dark:text-emerald-400"><i className="size-1.5 rounded-full bg-emerald-500" />Tudo sincronizado</span><button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="grid size-9 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:-translate-y-0.5 hover:text-zinc-950 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white" aria-label="Alternar tema">{resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}</button></div></header><main className="mx-auto max-w-[1480px] p-4 sm:p-7 lg:p-9"><div className="animate-page-in">{children}</div></main></div>
  </div>;
}
