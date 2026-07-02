"use client";
import { CalendarDays, Check, Trash2 } from "lucide-react";
import type { LifeTask } from "@/types";
import { cn } from "@/lib/utils";

export function TaskCard({ task, onToggle, onDelete }: { task: LifeTask; onToggle: () => void; onDelete?: () => void }) {
  const priority = { high: "Alta", medium: "Média", low: "Baixa" }[task.priority];
  return <div className="life-card group rounded-2xl p-4"><div className="flex items-start gap-3"><button onClick={onToggle} className={cn("mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg border", task.status === "completed" ? "border-gold-400 bg-gold-400 text-black" : "border-zinc-300 text-transparent dark:border-zinc-700")}><Check className="size-3.5" /></button><div className="min-w-0 flex-1"><p className={cn("text-sm font-semibold", task.status === "completed" && "text-zinc-400 line-through")}>{task.title}</p><p className="mt-1 text-[11px] leading-5 text-zinc-500">{task.description}</p><div className="mt-3 flex flex-wrap items-center gap-2 text-[10px]"><span className={cn("rounded-full px-2 py-1 font-semibold", task.priority === "high" ? "bg-red-500/10 text-red-500" : task.priority === "medium" ? "bg-amber-500/10 text-amber-500" : "bg-zinc-500/10 text-zinc-500")}>{priority}</span><span className="flex items-center gap-1 text-zinc-400"><CalendarDays className="size-3" />{new Date(`${task.dueDate}T12:00:00`).toLocaleDateString("pt-BR")}</span></div></div>{onDelete && <button onClick={onDelete} className="hidden rounded-lg p-2 text-zinc-400 hover:bg-red-500/10 hover:text-red-500 group-hover:block"><Trash2 className="size-4" /></button>}</div></div>;
}
