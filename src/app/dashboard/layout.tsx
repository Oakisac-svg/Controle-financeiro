"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bot, Goal, LayoutDashboard, LogOut, Menu, Moon, Settings, Sparkles, Sun, WalletCards, X } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useTheme } from "@/context/theme";
import { cn } from "@/lib/utils";
import { PageLoading } from "@/components/ui/page-loading";

const navigation = [
  { href: "/dashboard", label: "Visão geral", icon: LayoutDashboard },
  { href: "/transactions", label: "Transações", icon: WalletCards },
  { href: "/goals", label: "Metas", icon: Goal },
  { href: "/finbot", label: "FinBot", icon: Bot },
  { href: "/settings", label: "Configurações", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, signOut } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/auth/login");
  }, [loading, user, router]);

  async function logout() { await signOut(); router.replace("/"); router.refresh(); }

  if (loading || !user) return <main className="mx-auto min-h-screen max-w-6xl p-6 pt-24"><PageLoading /></main>;

  const initials = (profile?.full_name || user.email || "F").split(" ").map(item => item[0]).join("").slice(0, 2).toUpperCase();
  return <div className="min-h-screen bg-[#f7f7f5] dark:bg-[#090909]">
    {open && <button aria-label="Fechar menu" className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />}
    <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-zinc-200 bg-white p-4 transition-transform lg:translate-x-0 dark:border-zinc-800 dark:bg-zinc-950", open ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex h-14 items-center justify-between px-2"><Link href="/dashboard" className="flex items-center gap-2.5 font-display text-lg font-bold"><span className="grid size-9 place-items-center rounded-xl bg-zinc-950 text-gold-300 dark:bg-gold-400 dark:text-black"><Sparkles className="size-4" /></span>FinMb</Link><button className="rounded-lg p-2 lg:hidden" onClick={() => setOpen(false)} aria-label="Fechar menu"><X className="size-5" /></button></div>
      <nav className="mt-8 flex-1 space-y-1">{navigation.map(({ href, label, icon: Icon }) => { const active = pathname === href; return <Link key={href} href={href} onClick={() => setOpen(false)} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium", active ? "bg-zinc-950 text-white shadow-sm dark:bg-gold-400 dark:text-black" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white")}><Icon className="size-[18px]" />{label}</Link>; })}</nav>
      <div className="rounded-2xl border border-zinc-200 p-3 dark:border-zinc-800"><div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold-400 text-sm font-bold text-black">{initials}</span><div className="min-w-0"><p className="truncate text-sm font-semibold">{profile?.full_name || "Sua conta"}</p><p className="truncate text-xs text-zinc-500">{user.email}</p></div></div><button onClick={logout} className="mt-3 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium text-zinc-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"><LogOut className="size-4" />Sair da conta</button></div>
    </aside>
    <div className="lg:pl-72"><header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-[#f7f7f5]/85 px-4 backdrop-blur-xl sm:px-7 dark:border-zinc-800 dark:bg-[#090909]/85"><button onClick={() => setOpen(true)} className="rounded-xl border border-zinc-200 bg-white p-2 lg:hidden dark:border-zinc-800 dark:bg-zinc-900" aria-label="Abrir menu"><Menu className="size-5" /></button><p className="hidden text-xs font-medium text-zinc-500 sm:block">Seu dinheiro, em perspectiva.</p><button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="ml-auto grid size-9 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white" aria-label="Alternar tema">{resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}</button></header><main className="mx-auto max-w-[1500px] p-4 sm:p-7 lg:p-9">{children}</main></div>
  </div>;
}
