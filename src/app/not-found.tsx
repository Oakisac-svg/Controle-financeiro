import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-[#fafaf8] px-5 text-center dark:bg-[#090909]"><div><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-zinc-950 text-gold-300 dark:bg-gold-400 dark:text-black"><Sparkles className="size-6" /></span><p className="mt-8 text-sm font-semibold text-gold-500">ERRO 404</p><h1 className="mt-2 font-display text-4xl font-semibold">Esta página saiu do orçamento.</h1><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">O endereço não existe ou foi movido. Volte ao início para encontrar o caminho certo.</p><Button asChild className="mt-7 rounded-xl"><Link href="/"><ArrowLeft className="mr-2 size-4" />Voltar ao início</Link></Button></div></main>;
}
