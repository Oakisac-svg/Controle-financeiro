import { Banknote, CalendarCheck, CheckCircle2, Goal, Salad, Sparkles } from "lucide-react";
import { Reveal } from "@/components/landing/landing-motion";
import { SectionHeading } from "@/components/landing/section-heading";

const benefits = [
  ["Economize dinheiro", "Veja onde seu dinheiro escapa e transforme padroes em decisao.", Banknote],
  ["Melhore habitos", "Acompanhe consistencia sem transformar sua rotina em pressao.", CheckCircle2],
  ["Planeje refeicoes", "Organize calorias, macros e horarios no contexto do seu dia.", Salad],
  ["Organize tarefas", "Priorize o que importa e entenda o impacto no seu progresso.", CalendarCheck],
  ["Acompanhe metas", "Metas financeiras e pessoais deixam de ficar soltas.", Goal],
  ["Tudo em um lugar", "Menos planilhas, menos abas, mais clareza para agir.", Sparkles],
] as const;

export function Benefits() {
  return (
    <section className="landing-section px-5 py-28 lg:px-8">
      <Reveal className="mx-auto max-w-7xl">
        <SectionHeading
          center
          eyebrow="Beneficios"
          title="Menos dispersao. Mais direcao."
          text="O FinMb foi desenhado para quem quer organizar a vida com elegancia, contexto e uma camada real de inteligencia."
        />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(([title, text, Icon], index) => (
            <Reveal key={title} delay={index * 0.04}>
              <article className="premium-card h-full rounded-[26px] border border-white/10 bg-white/[.035] p-6">
                <Icon className="size-6 text-gold-300" />
                <h3 className="mt-7 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
