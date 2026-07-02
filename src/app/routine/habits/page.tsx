"use client";
import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import { useLifeData } from "@/hooks/useLifeData";
import { HabitCard } from "@/components/routine/habit-card";
import { PageHeader } from "@/components/life/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/useToast";

export default function HabitsPage(){const data=useLifeData();const[show,setShow]=useState(false);const[title,setTitle]=useState("");function add(){if(!title.trim())return;data.addHabit({title:title.trim(),description:"Novo hábito pessoal",frequency:"Todos os dias"});setTitle("");setShow(false);toast({title:"Hábito criado",description:"Ele já está no seu plano de hoje.",variant:"success"})}return <div className="space-y-7"><PageHeader eyebrow="Rotina · Hábitos" title="Consistência vence intensidade." description="Acompanhe hábitos que sustentam seus objetivos e celebre cada pequena vitória." action={<Button onClick={()=>setShow(v=>!v)} className="rounded-xl bg-gold-400 text-black"><Plus className="mr-2 size-4"/>Novo hábito</Button>}/>{show&&<div className="life-card flex flex-col gap-3 rounded-2xl p-4 sm:flex-row"><Input value={title} onChange={e=>setTitle(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="Ex.: Caminhar por 30 minutos" className="h-11 rounded-xl" autoFocus/><Button onClick={add} className="h-11 rounded-xl bg-zinc-950 text-white dark:bg-gold-400 dark:text-black">Adicionar à rotina</Button></div>}<div className="rounded-2xl border border-gold-400/20 bg-gold-400/[.05] p-4"><p className="flex items-center gap-2 text-xs font-semibold"><Sparkles className="size-4 text-gold-500"/>Você concluiu {data.metrics.completedHabits} de {data.habits.length} hábitos hoje.</p></div><div className="grid gap-3 lg:grid-cols-2">{data.habits.map(h=><HabitCard key={h.id} habit={h} onToggle={()=>data.toggleHabit(h.id)} onDelete={()=>{data.deleteHabit(h.id);toast({title:"Hábito removido"})}}/>)}</div></div>}
