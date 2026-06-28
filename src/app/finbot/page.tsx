"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Lightbulb, LoaderCircle, Send, Sparkles } from "lucide-react";
import { useGoals } from "@/hooks/useGoals";
import { useTransactions } from "@/hooks/useTransactions";
import { getCategoryTotals, getFinancialSummary } from "@/lib/finance";
import { TRANSACTION_CATEGORIES } from "@/config/constants";
import { formatCurrency } from "@/utils/formatting";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatMessage { id: number; role: "user" | "assistant"; content: string; }
const suggestions = ["Analise meus gastos", "Como posso economizar?", "Como estão minhas metas?", "Qual é meu saldo do mês?"];

export default function FinBotPage() {
  const { transactions, fetchTransactions } = useTransactions();
  const { goals, fetchGoals } = useGoals();
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 1, role: "assistant", content: "Olá! Eu sou o FinBot. Posso transformar seus lançamentos e metas em respostas mais claras. O que você quer entender hoje?" }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { void fetchTransactions(); void fetchGoals(); }, [fetchTransactions, fetchGoals]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, thinking]);
  const summary = useMemo(() => getFinancialSummary(transactions, goals), [transactions, goals]);
  const categories = useMemo(() => getCategoryTotals(transactions), [transactions]);

  function answer(question: string) {
    if (!transactions.length) return "Ainda não tenho lançamentos suficientes para uma análise pessoal. Adicione uma receita e algumas despesas; depois eu mostro padrões, saldo e oportunidades de economia.";
    const text = question.toLowerCase();
    if (text.includes("meta")) { const active = summary.activeGoals[0]; return active ? `Você tem ${summary.activeGoals.length} meta(s) em andamento. “${active.name}” está em ${Math.min(100, (Number(active.current_value) / Number(active.target_value)) * 100).toFixed(0)}%. Faltam ${formatCurrency(Math.max(0, Number(active.target_value) - Number(active.current_value)))} para concluir.` : "Você ainda não tem uma meta ativa. Uma boa primeira meta é uma reserva de emergência equivalente a alguns meses das suas despesas essenciais."; }
    if (text.includes("saldo") || text.includes("receita")) return `Neste mês, você registrou ${formatCurrency(summary.income)} em receitas e ${formatCurrency(summary.expenses)} em despesas. Seu saldo é ${formatCurrency(summary.balance)} e a taxa de economia está em ${summary.savingsRate.toFixed(0)}%.`;
    const top = categories[0];
    if (text.includes("gasto") || text.includes("analis")) return top ? `${TRANSACTION_CATEGORIES[top.name].label} é sua maior categoria de despesas, com ${formatCurrency(top.value)}. Vale revisar os itens dessa categoria primeiro: pequenas decisões ali tendem a produzir o maior efeito.` : "Suas despesas ainda não formam um padrão claro. Continue registrando os gastos para eu comparar categorias.";
    if (text.includes("econom")) return summary.savings > 0 ? `Você já economizou ${formatCurrency(summary.savings)} neste mês. Se mantiver essa taxa, priorize direcionar uma parte automaticamente para sua meta mais importante.` : `Seu saldo mensal está em ${formatCurrency(summary.balance)}. Comece pela maior categoria de despesas e defina um limite pequeno e realista para a próxima semana.`;
    return `Seu score atual é ${summary.score}/100. Ele considera economia, avanço das metas e consistência dos registros. Minha sugestão agora é ${summary.balance >= 0 ? "direcionar parte do saldo para uma meta ativa" : "revisar a maior categoria de despesas antes de assumir novos compromissos"}.`;
  }

  function send(question = input) {
    const content = question.trim(); if (!content || thinking) return;
    setMessages(current => [...current, { id: Date.now(), role: "user", content }]); setInput(""); setThinking(true);
    window.setTimeout(() => { setMessages(current => [...current, { id: Date.now() + 1, role: "assistant", content: answer(content) }]); setThinking(false); }, 550);
  }

  return <div className="space-y-7"><div><p className="text-sm text-zinc-500">Inteligência financeira</p><h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">FinBot</h1><p className="mt-2 text-sm text-zinc-500">Respostas simuladas, mas conectadas aos dados que você cadastrou.</p></div><div className="grid gap-4 xl:grid-cols-[1fr_300px]"><section className="flex min-h-[650px] flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"><header className="flex items-center gap-3 border-b border-zinc-100 p-4 sm:p-5 dark:border-zinc-800"><span className="grid size-11 place-items-center rounded-2xl bg-gold-400 text-black"><Bot className="size-5" /></span><div><p className="text-sm font-semibold">FinBot</p><p className="text-xs text-emerald-500">● Pronto para analisar</p></div><span className="ml-auto hidden rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-semibold text-zinc-500 sm:block dark:bg-zinc-900">MODO DEMONSTRAÇÃO</span></header><div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">{messages.map(message => <div key={message.id} className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>{message.role === "assistant" && <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-zinc-950 text-gold-300 dark:bg-gold-400 dark:text-black"><Sparkles className="size-3" /></span>}<div className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[72%] ${message.role === "user" ? "rounded-br-sm bg-gold-400 text-black" : "rounded-bl-sm bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"}`}>{message.content}</div></div>)}{thinking && <div className="flex items-center gap-2 text-xs text-zinc-400"><LoaderCircle className="size-4 animate-spin" />Analisando seus números…</div>}<div ref={endRef} /></div><div className="border-t border-zinc-100 p-4 dark:border-zinc-800"><form onSubmit={e => { e.preventDefault(); send(); }} className="flex gap-2"><Input value={input} onChange={e=>setInput(e.target.value)} placeholder="Pergunte sobre seus gastos, metas ou saldo…" disabled={thinking} className="h-12"/><Button type="submit" className="h-12 rounded-xl" disabled={!input.trim() || thinking} aria-label="Enviar mensagem"><Send className="size-4" /><span className="ml-2 hidden sm:inline">Enviar</span></Button></form></div></section><aside className="space-y-4"><div className="rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"><div className="flex items-center gap-2 text-sm font-semibold"><Lightbulb className="size-4 text-gold-500" />Perguntas rápidas</div><div className="mt-4 space-y-2">{suggestions.map(item => <button key={item} onClick={()=>send(item)} disabled={thinking} className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-left text-xs hover:border-gold-400 hover:bg-gold-50 disabled:opacity-50 dark:border-zinc-800 dark:hover:bg-gold-400/10">{item}</button>)}</div></div><div className="rounded-3xl bg-zinc-950 p-5 text-white dark:bg-zinc-900"><p className="text-[10px] font-semibold tracking-wider text-gold-300">PRONTO PARA EVOLUIR</p><p className="mt-3 text-sm leading-6 text-zinc-300">A camada de chat está isolada e preparada para uma futura integração com API de IA no servidor.</p></div></aside></div></div>;
}
