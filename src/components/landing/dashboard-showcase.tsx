import { BarChart3, CalendarDays, CheckCircle2, Goal, Utensils, WalletCards } from "lucide-react";
import { Reveal } from "@/components/landing/landing-motion";
import { SectionHeading } from "@/components/landing/section-heading";

export function DashboardShowcase() {
  return (
    <section className="landing-section px-5 py-28 lg:px-8">
      <Reveal className="mx-auto max-w-7xl">
        <SectionHeading
          center
          eyebrow="Dashboard"
          title="Tudo importante na mesma tela."
          text="Uma experiencia premium para acompanhar financeiro, rotina, metas, calendario e alimentacao sem parecer um painel antigo."
        />
        <div className="mt-16 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
          <div className="premium-card rounded-[34px] border border-white/10 bg-white/[.045] p-5 backdrop-blur-xl">
            <div className="rounded-[28px] bg-[#070707] p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-300">Life Dashboard</p>
                  <h3 className="mt-2 font-display text-3xl font-semibold">Bom dia, Marina.</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[.06] px-4 py-2 text-sm text-zinc-400">Julho 2026</div>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <Metric icon={WalletCards} label="Saldo" value="R$ 12.840" />
                <Metric icon={CheckCircle2} label="Habitos" value="82%" />
                <Metric icon={Utensils} label="Refeicoes" value="18/21" />
              </div>
              <div className="mt-4 rounded-3xl border border-white/10 bg-white/[.04] p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Evolucao integrada</p>
                  <span className="text-xs text-gold-300">+14% esta semana</span>
                </div>
                <svg viewBox="0 0 720 220" className="mt-7 h-56 w-full" aria-label="Grafico de evolucao">
                  <defs>
                    <linearGradient id="dashboardGold" x1="0" x2="0" y1="0" y2="1">
                      <stop stopColor="#d4af37" stopOpacity=".34" />
                      <stop offset="1" stopColor="#d4af37" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 188 C70 174 84 133 150 146 C218 159 242 92 306 103 C390 118 403 48 486 62 C560 74 604 38 720 24 V220 H0Z" fill="url(#dashboardGold)" />
                  <path d="M0 188 C70 174 84 133 150 146 C218 159 242 92 306 103 C390 118 403 48 486 62 C560 74 604 38 720 24" fill="none" stroke="#d4af37" strokeLinecap="round" strokeWidth="5" />
                </svg>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <MiniPanel icon={Goal} title="Metas" text="Reserva de emergencia chegou a 72%." />
            <MiniPanel icon={CalendarDays} title="Calendario" text="5 tarefas importantes antes de sexta." />
            <MiniPanel icon={BarChart3} title="Insights" text="Dias com refeicao planejada reduziram gastos em 21%." />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof WalletCards; label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[.05] p-4">
      <Icon className="size-5 text-gold-300" />
      <p className="mt-5 text-xs text-zinc-500">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold">{value}</p>
    </div>
  );
}

function MiniPanel({ icon: Icon, title, text }: { icon: typeof Goal; title: string; text: string }) {
  return (
    <article className="premium-card rounded-[28px] border border-white/10 bg-white/[.045] p-6 backdrop-blur-xl">
      <span className="grid size-11 place-items-center rounded-2xl bg-gold-400/12 text-gold-300">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-8 font-display text-2xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-zinc-400">{text}</p>
    </article>
  );
}
