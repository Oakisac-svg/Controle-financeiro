"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Bot, Goal, PiggyBank, Plus, Receipt, Sparkles, Wallet } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useGoals } from "@/hooks/useGoals";
import { useTransactions } from "@/hooks/useTransactions";
import { getCategoryTotals, getFinancialSummary } from "@/lib/finance";
import { TRANSACTION_CATEGORIES } from "@/config/constants";
import { formatCurrency, formatDate } from "@/utils/formatting";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageLoading } from "@/components/ui/page-loading";

const colors = ["#d4af37", "#3f3f46", "#a1a1aa", "#71717a", "#e4c968"];

export default function DashboardPage() {
  const { profile } = useAuth();
  const { transactions, fetchTransactions, loading: transactionsLoading } = useTransactions();
  const { goals, fetchGoals, loading: goalsLoading } = useGoals();

  useEffect(() => { void fetchTransactions(); void fetchGoals(); }, [fetchTransactions, fetchGoals]);
  const summary = useMemo(() => getFinancialSummary(transactions, goals), [transactions, goals]);
  const categoryData = useMemo(() => getCategoryTotals(transactions).slice(0, 5).map(item => ({ ...item, label: TRANSACTION_CATEGORIES[item.name].label })), [transactions]);
  const chartData = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("pt-BR", { month: "short" });
    return Array.from({ length: 6 }, (_, offset) => {
      const date = new Date(); date.setMonth(date.getMonth() - (5 - offset));
      const monthItems = transactions.filter(item => { const d = new Date(`${item.date}T12:00:00`); return d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear(); });
      return { month: formatter.format(date).replace(".", ""), receitas: monthItems.filter(x => x.type === "income").reduce((s,x) => s + Number(x.value),0), despesas: monthItems.filter(x => x.type === "expense").reduce((s,x) => s + Number(x.value),0) };
    });
  }, [transactions]);
  if ((transactionsLoading || goalsLoading) && !transactions.length && !goals.length) return <PageLoading />;
  const firstName = profile?.full_name?.split(" ")[0] || "por aqui";
  const cards = [
    { label: "Saldo do mês", value: summary.balance, icon: Wallet, tone: summary.balance >= 0 ? "text-emerald-500" : "text-red-500", detail: "receitas menos despesas" },
    { label: "Receitas", value: summary.income, icon: ArrowUpRight, tone: "text-emerald-500", detail: "no mês atual" },
    { label: "Despesas", value: summary.expenses, icon: ArrowDownRight, tone: "text-red-500", detail: "no mês atual" },
    { label: "Economia", value: summary.savings, icon: PiggyBank, tone: "text-gold-500", detail: `${summary.savingsRate.toFixed(0)}% da receita` },
  ];
  const bestCategory = categoryData[0];

  return <div className="space-y-7">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm text-zinc-500">Visão geral</p><h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Olá, {firstName}.</h1><p className="mt-2 text-sm text-zinc-500">Aqui está o pulso da sua vida financeira.</p></div><div className="flex flex-wrap gap-2"><Button asChild variant="outline" className="rounded-xl"><Link href="/goals"><Goal className="mr-2 size-4" />Nova meta</Link></Button><Button asChild className="rounded-xl bg-zinc-950 text-white dark:bg-gold-400 dark:text-black"><Link href="/transactions?novo=1"><Plus className="mr-2 size-4" />Adicionar lançamento</Link></Button></div></div>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{cards.map(({ label,value,icon:Icon,tone,detail }) => <Card key={label} className="rounded-2xl border-zinc-200 shadow-none dark:border-zinc-800"><CardContent className="p-5"><div className="flex items-center justify-between"><p className="text-xs font-medium text-zinc-500">{label}</p><span className={`grid size-8 place-items-center rounded-xl bg-zinc-100 dark:bg-zinc-800 ${tone}`}><Icon className="size-4" /></span></div><p className="mt-5 font-display text-2xl font-semibold tracking-tight">{formatCurrency(value)}</p><p className="mt-1 text-xs text-zinc-500">{detail}</p></CardContent></Card>)}</div>
    <div className="grid gap-4 xl:grid-cols-[1.55fr_1fr]"><Card className="rounded-2xl border-zinc-200 shadow-none dark:border-zinc-800"><CardHeader className="flex-row items-center justify-between"><div><CardTitle className="font-display">Fluxo dos últimos 6 meses</CardTitle><p className="mt-1 text-xs text-zinc-500">Receitas e despesas cadastradas</p></div></CardHeader><CardContent className="h-72"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{ left: -20, right: 8 }}><defs><linearGradient id="income" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d4af37" stopOpacity={0.4}/><stop offset="1" stopColor="#d4af37" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#a1a1aa33"/><XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={11}/><YAxis axisLine={false} tickLine={false} fontSize={10}/><Tooltip formatter={(value) => formatCurrency(Number(value))} contentStyle={{ borderRadius: 12, borderColor: "#d4af3744" }}/><Area type="monotone" dataKey="receitas" stroke="#d4af37" strokeWidth={2.5} fill="url(#income)"/><Area type="monotone" dataKey="despesas" stroke="#71717a" strokeWidth={2} fill="transparent"/></AreaChart></ResponsiveContainer></CardContent></Card>
      <Card className="rounded-2xl border-zinc-200 shadow-none dark:border-zinc-800"><CardHeader><CardTitle className="font-display">Despesas por categoria</CardTitle><p className="text-xs text-zinc-500">Onde seu dinheiro está indo</p></CardHeader><CardContent>{categoryData.length ? <div className="flex items-center gap-4"><div className="h-48 w-1/2"><ResponsiveContainer><PieChart><Pie data={categoryData} dataKey="value" nameKey="label" innerRadius={48} outerRadius={72} paddingAngle={3}>{categoryData.map((item,i)=><Cell key={item.name} fill={colors[i % colors.length]} />)}</Pie><Tooltip formatter={(value)=>formatCurrency(Number(value))}/></PieChart></ResponsiveContainer></div><div className="min-w-0 flex-1 space-y-3">{categoryData.slice(0,4).map((item,i)=><div className="flex items-center justify-between gap-2 text-xs" key={item.name}><span className="flex min-w-0 items-center gap-2 truncate"><i className="size-2 rounded-full" style={{background:colors[i]}}/>{item.label}</span><strong>{formatCurrency(item.value)}</strong></div>)}</div></div> : <EmptyState icon={Receipt} title="Sem despesas ainda" description="Cadastre seu primeiro gasto para ver a distribuição por categoria." />}</CardContent></Card></div>
    <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]"><Card className="rounded-2xl border-zinc-200 shadow-none dark:border-zinc-800"><CardHeader className="flex-row items-center justify-between"><div><CardTitle className="font-display">Últimos lançamentos</CardTitle><p className="mt-1 text-xs text-zinc-500">Movimentações mais recentes</p></div><Link href="/transactions" className="flex items-center gap-1 text-xs font-semibold text-gold-500">Ver todos <ArrowRight className="size-3" /></Link></CardHeader><CardContent>{transactions.length ? <div className="divide-y divide-zinc-100 dark:divide-zinc-800">{transactions.slice(0,5).map(item => <div className="flex items-center gap-3 py-3" key={item.id}><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-zinc-100 text-zinc-500 dark:bg-zinc-800"><Receipt className="size-4" /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{item.name}</p><p className="text-xs text-zinc-500">{TRANSACTION_CATEGORIES[item.category].label} · {formatDate(item.date)}</p></div><p className={`text-sm font-semibold ${item.type === "income" ? "text-emerald-500" : "text-zinc-800 dark:text-zinc-200"}`}>{item.type === "income" ? "+" : "−"}{formatCurrency(Number(item.value))}</p></div>)}</div> : <EmptyState icon={Receipt} title="Sua história começa aqui" description="Adicione uma receita ou despesa para criar seu panorama financeiro." action={<Button asChild size="sm"><Link href="/transactions?novo=1">Adicionar lançamento</Link></Button>} />}</CardContent></Card>
      <div className="space-y-4"><Card className="overflow-hidden rounded-2xl border-0 bg-zinc-950 text-white shadow-none dark:bg-gold-400 dark:text-black"><CardContent className="p-6"><div className="flex items-center justify-between"><span className="grid size-9 place-items-center rounded-xl bg-gold-400 text-black dark:bg-black dark:text-gold-300"><Bot className="size-4" /></span><span className="text-[10px] font-semibold tracking-wider opacity-50">FINBOT ANALISA</span></div><p className="mt-7 font-display text-lg font-semibold">{summary.score >= 70 ? "Seu mês está bem encaminhado." : transactions.length ? "Há espaço para melhorar este mês." : "Pronto para conhecer seu padrão financeiro?"}</p><p className="mt-2 text-sm leading-6 opacity-70">{bestCategory ? `${bestCategory.label} é sua maior categoria de despesas. Pergunte como reduzi-la sem radicalismos.` : "Registre alguns lançamentos e eu preparo análises baseadas nos seus números."}</p><Link href="/finbot" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold">Conversar com o FinBot <ArrowRight className="size-3" /></Link></CardContent></Card><Card className="rounded-2xl border-zinc-200 shadow-none dark:border-zinc-800"><CardContent className="flex items-center gap-4 p-5"><div className="relative grid size-16 shrink-0 place-items-center rounded-full bg-zinc-100 dark:bg-zinc-800"><Sparkles className="size-5 text-gold-500" /><span className="absolute -bottom-1 rounded-full bg-zinc-950 px-2 py-0.5 text-[10px] font-bold text-white dark:bg-gold-400 dark:text-black">{summary.score}</span></div><div><p className="text-sm font-semibold">Score financeiro</p><p className="mt-1 text-xs leading-5 text-zinc-500">Calculado por economia, metas e consistência nos registros.</p></div></CardContent></Card></div></div>
  </div>;
}
