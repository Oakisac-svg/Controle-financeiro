import { BrainCircuit, LockKeyhole, ShieldCheck, Sparkles, Unplug } from "lucide-react";
import { Reveal } from "@/components/landing/landing-motion";

const items = [
  ["100%", "Dados seguros", ShieldCheck],
  ["Open Finance", "Pronto para conexoes", Unplug],
  ["Criptografia", "Camada de confianca", LockKeyhole],
  ["IA Inteligente", "Insights contextuais", BrainCircuit],
  ["Tudo em um", "Vida organizada", Sparkles],
] as const;

export function TrustBar() {
  return (
    <section className="px-5 pb-20 lg:px-8">
      <Reveal className="mx-auto grid max-w-7xl gap-3 rounded-[28px] border border-white/10 bg-white/[.045] p-3 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-5">
        {items.map(([value, label, Icon]) => (
          <div key={value} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/18 px-4 py-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-gold-400/12 text-gold-300">
              <Icon className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{value}</p>
              <p className="text-xs text-zinc-500">{label}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
