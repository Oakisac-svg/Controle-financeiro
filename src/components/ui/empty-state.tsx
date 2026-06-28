import type { LucideIcon } from "lucide-react";

export function EmptyState({ icon: Icon, title, description, action }: { icon: LucideIcon; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 px-5 py-10 text-center dark:border-zinc-700">
      <div className="mb-4 rounded-2xl bg-gold-400/12 p-3 text-gold-500"><Icon className="size-6" /></div>
      <h3 className="font-display font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
