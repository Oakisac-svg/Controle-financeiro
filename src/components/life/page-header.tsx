import type { LucideIcon } from "lucide-react";

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[.16em] text-gold-500">{eyebrow}</p><h1 className="mt-2 font-display text-3xl font-semibold tracking-[-.035em] sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">{description}</p></div>{action}</div>;
}

export function MetricCard({ label, value, detail, icon: Icon, accent = "gold" }: { label: string; value: string; detail: string; icon: LucideIcon; accent?: "gold" | "green" | "purple" }) {
  const tone = accent === "green" ? "bg-emerald-500/10 text-emerald-500" : accent === "purple" ? "bg-violet-500/10 text-violet-500" : "bg-gold-400/10 text-gold-500";
  return <div className="life-card rounded-2xl p-5"><div className="flex items-center justify-between"><p className="text-xs font-medium text-zinc-500">{label}</p><span className={`grid size-9 place-items-center rounded-xl ${tone}`}><Icon className="size-4" /></span></div><p className="mt-5 font-display text-2xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-[11px] text-zinc-500">{detail}</p></div>;
}
