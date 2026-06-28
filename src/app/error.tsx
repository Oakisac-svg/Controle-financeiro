"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="grid min-h-screen place-items-center px-5 text-center"><div><p className="text-sm font-semibold text-gold-500">ALGO NÃO SAIU COMO ESPERADO</p><h1 className="mt-3 font-display text-3xl font-semibold">Vamos tentar outra vez.</h1><p className="mt-3 text-sm text-zinc-500">Se o problema continuar, confira sua conexão e as variáveis do Supabase.</p><Button onClick={reset} className="mt-7"><RotateCcw className="mr-2 size-4" />Tentar novamente</Button></div></main>;
}
