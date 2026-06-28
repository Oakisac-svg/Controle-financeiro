import { AlertTriangle } from "lucide-react";

export function ConfigAlert() {
  return <div className="flex gap-3 rounded-2xl border border-amber-300/60 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-700/60 dark:bg-amber-950/30 dark:text-amber-100"><AlertTriangle className="mt-0.5 size-5 shrink-0" /><div><p className="font-semibold">Conexão pendente</p><p className="mt-0.5 opacity-80">Adicione as duas variáveis públicas do Supabase ao arquivo .env.local para habilitar login e dados.</p></div></div>;
}
