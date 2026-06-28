"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Edit3, LoaderCircle, Plus, Receipt, Trash2, X } from "lucide-react";
import { useTransactions, type TransactionInput } from "@/hooks/useTransactions";
import type { Transaction, TransactionCategory, TransactionType } from "@/types";
import { TRANSACTION_CATEGORIES } from "@/config/constants";
import { formatCurrency, formatDate } from "@/utils/formatting";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/ui/empty-state";
import { useToast } from "@/hooks/useToast";

const today = () => new Date().toISOString().slice(0, 10);
const blank = { name: "", value: "", category: "other" as TransactionCategory, type: "expense" as TransactionType, date: today(), observation: "" };

function TransactionsContent() {
  const search = useSearchParams();
  const { transactions, fetchTransactions, createTransaction, updateTransaction, deleteTransaction, loading, error } = useTransactions();
  const { toast } = useToast();
  const [open, setOpen] = useState(search.get("novo") === "1");
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);

  useEffect(() => { void fetchTransactions(); }, [fetchTransactions]);
  function close() { setOpen(false); setEditing(null); setForm(blank); }
  function edit(item: Transaction) { setEditing(item.id); setForm({ name: item.name, value: String(item.value), category: item.category, type: item.type, date: item.date, observation: item.observation ?? "" }); setOpen(true); }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = Number(form.value);
    if (!form.name.trim() || !Number.isFinite(value) || value <= 0) return toast({ variant: "destructive", title: "Revise os dados", description: "Informe uma descrição e um valor maior que zero." });
    const input: TransactionInput = { name: form.name.trim(), value, category: form.category, type: form.type, date: form.date, observation: form.observation.trim() || null, is_recurring: false, recurring_frequency: null };
    setSaving(true);
    try { if (editing) await updateTransaction(editing, input); else await createTransaction(input); toast({ variant: "success", title: editing ? "Lançamento atualizado" : "Lançamento criado", description: "Seu panorama financeiro já foi recalculado." }); close(); }
    catch (cause) { toast({ variant: "destructive", title: "Não foi possível salvar", description: cause instanceof Error ? cause.message : "Tente novamente." }); }
    finally { setSaving(false); }
  }
  async function remove(id: string) { if (!window.confirm("Excluir este lançamento?")) return; try { await deleteTransaction(id); toast({ title: "Lançamento excluído" }); } catch (cause) { toast({ variant: "destructive", title: "Não foi possível excluir", description: cause instanceof Error ? cause.message : "Tente novamente." }); } }

  return <div className="space-y-7">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-zinc-500">Organização</p><h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Transações</h1><p className="mt-2 text-sm text-zinc-500">Receitas e despesas, sem mistério.</p></div><Button onClick={() => { close(); setOpen(true); }} className="rounded-xl bg-zinc-950 text-white dark:bg-gold-400 dark:text-black"><Plus className="mr-2 size-4" />Novo lançamento</Button></div>
    {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">{error}</div>}
    {open && <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-soft sm:p-7 dark:border-zinc-800 dark:bg-zinc-950"><div className="mb-6 flex items-center justify-between"><div><h2 className="font-display text-xl font-semibold">{editing ? "Editar lançamento" : "Novo lançamento"}</h2><p className="mt-1 text-xs text-zinc-500">Preencha os dados para atualizar seu dashboard.</p></div><button onClick={close} className="rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900" aria-label="Fechar"><X className="size-5" /></button></div><form onSubmit={submit} className="space-y-5"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><div className="space-y-2 md:col-span-2 xl:col-span-1"><Label htmlFor="name">Descrição</Label><Input id="name" placeholder="Ex.: Supermercado" value={form.name} onChange={e => setForm({...form,name:e.target.value})} /></div><div className="space-y-2"><Label htmlFor="value">Valor</Label><Input id="value" type="number" min="0.01" step="0.01" placeholder="0,00" value={form.value} onChange={e => setForm({...form,value:e.target.value})} /></div><div className="space-y-2"><Label htmlFor="date">Data</Label><Input id="date" type="date" value={form.date} onChange={e => setForm({...form,date:e.target.value})} /></div><div className="space-y-2"><Label htmlFor="type">Tipo</Label><select id="type" value={form.type} onChange={e => setForm({...form,type:e.target.value as TransactionType})} className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm dark:border-zinc-800 dark:bg-zinc-900"><option value="expense">Despesa</option><option value="income">Receita</option></select></div><div className="space-y-2"><Label htmlFor="category">Categoria</Label><select id="category" value={form.category} onChange={e => setForm({...form,category:e.target.value as TransactionCategory})} className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm dark:border-zinc-800 dark:bg-zinc-900">{Object.entries(TRANSACTION_CATEGORIES).map(([key,item])=><option key={key} value={key}>{item.label}</option>)}</select></div><div className="space-y-2 md:col-span-2 xl:col-span-1"><Label htmlFor="observation">Observação</Label><Textarea id="observation" className="min-h-11" placeholder="Opcional" value={form.observation} onChange={e => setForm({...form,observation:e.target.value})} /></div></div><div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={close}>Cancelar</Button><Button disabled={saving}>{saving && <LoaderCircle className="mr-2 size-4 animate-spin" />}{editing ? "Salvar alterações" : "Adicionar lançamento"}</Button></div></form></div>}
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"><div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 dark:border-zinc-800"><div><h2 className="text-sm font-semibold">Histórico</h2><p className="text-xs text-zinc-500">{transactions.length} lançamento{transactions.length === 1 ? "" : "s"}</p></div></div>{loading && !transactions.length ? <div className="p-10 text-center text-sm text-zinc-500">Carregando…</div> : transactions.length ? <div className="divide-y divide-zinc-100 dark:divide-zinc-800">{transactions.map(item => <div key={item.id} className="flex flex-wrap items-center gap-3 px-4 py-4 sm:flex-nowrap sm:px-5"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-zinc-100 text-zinc-500 dark:bg-zinc-900"><Receipt className="size-4" /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{item.name}</p><p className="mt-0.5 text-xs text-zinc-500">{TRANSACTION_CATEGORIES[item.category].label} · {formatDate(item.date)}</p></div><p className={`ml-auto text-sm font-semibold ${item.type === "income" ? "text-emerald-500" : ""}`}>{item.type === "income" ? "+" : "−"}{formatCurrency(Number(item.value))}</p><div className="flex gap-1"><button onClick={() => edit(item)} className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-white" aria-label={`Editar ${item.name}`}><Edit3 className="size-4" /></button><button onClick={() => remove(item.id)} className="rounded-lg p-2 text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30" aria-label={`Excluir ${item.name}`}><Trash2 className="size-4" /></button></div></div>)}</div> : <div className="p-5"><EmptyState icon={Receipt} title="Nenhum lançamento" description="Adicione sua primeira receita ou despesa para começar." action={<Button onClick={() => setOpen(true)} size="sm"><Plus className="mr-2 size-4" />Adicionar agora</Button>} /></div>}</div>
  </div>;
}

export default function TransactionsPage() { return <Suspense fallback={<div className="p-10 text-center text-sm text-zinc-500">Carregando…</div>}><TransactionsContent /></Suspense>; }
