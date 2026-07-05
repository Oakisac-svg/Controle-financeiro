import { Apple, CheckCircle2, Flag, WalletCards } from "lucide-react";
import { AnimatedCounter, Reveal } from "@/components/landing/landing-motion";
import { SectionHeading } from "@/components/landing/section-heading";

const pillars = [
  ["Financeiro", 84, WalletCards],
  ["Rotina", 79, CheckCircle2],
  ["Alimentacao", 72, Apple],
  ["Metas", 88, Flag],
] as const;

export function LifeScore() {
  return (
    <section id="life-score" className="landing-section relative px-5 py-28 lg:px-8">
      <div className="landing-grid-soft absolute inset-0 opacity-45" />
      <Reveal className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Life Score"
            title="Uma nota para enxergar o todo."
            text="O Life Score combina organizacao financeira, rotina, alimentacao e metas em uma visao simples de acompanhar todos os dias."
          />
          <div className="mt-8 rounded-[24px] border border-gold-400/18 bg-gold-400/[.07] p-5 text-sm leading-7 text-zinc-300">
            Ele nao cobra perfeicao. Ele mostra consistencia, revela gargalos e ajuda voce a decidir o proximo passo com clareza.
          </div>
        </div>

        <div className="premium-card rounded-[34px] border border-white/10 bg-white/[.045] p-5 shadow-[0_35px_120px_rgba(0,0,0,.34)] backdrop-blur-xl sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[.88fr_1.12fr]">
            <div className="rounded-[28px] border border-white/10 bg-[#070707] p-8 text-center">
              <div className="mx-auto grid size-52 place-items-center rounded-full bg-[conic-gradient(#d4af37_86%,#262626_0)] p-3">
                <div className="grid size-full place-items-center rounded-full bg-[#070707]">
                  <div>
                    <p className="font-display text-7xl font-semibold text-white">
                      <AnimatedCounter value={86} />
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-300">Life Score</p>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-lg font-semibold">Excelente consistencia</p>
              <p className="mt-2 text-sm leading-6 text-zinc-500">+12 pontos nos ultimos 30 dias.</p>
            </div>
            <div className="grid gap-3">
              {pillars.map(([label, value, Icon]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-black/22 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-2xl bg-gold-400/12 text-gold-300">
                        <Icon className="size-5" />
                      </span>
                      <p className="font-medium text-white">{label}</p>
                    </div>
                    <strong className="font-display text-2xl text-white">{value}</strong>
                  </div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <span className="block h-full rounded-full bg-gold-400" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
