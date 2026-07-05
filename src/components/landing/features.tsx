import { Bot, CalendarCheck, CircleDollarSign, Salad } from "lucide-react";
import { Reveal } from "@/components/landing/landing-motion";
import { SectionHeading } from "@/components/landing/section-heading";

const features = [
  {
    icon: Bot,
    title: "FinBot IA",
    text: "Pergunte sobre gastos, habitos, metas e rotina. O assistente responde com contexto, nao com frases genericas.",
  },
  {
    icon: CircleDollarSign,
    title: "Controle Financeiro",
    text: "Receitas, despesas, categorias, metas e saldo em uma experiencia limpa, pensada para decisao rapida.",
  },
  {
    icon: CalendarCheck,
    title: "Rotina",
    text: "Habitos, tarefas e calendario conectados para mostrar como seu tempo influencia seus resultados.",
  },
  {
    icon: Salad,
    title: "Nutricao",
    text: "Refeicoes, calorias e macros organizados junto da sua rotina para criar consistencia sem friccao.",
  },
] as const;

export function Features() {
  return (
    <section id="recursos" className="landing-section px-5 py-28 lg:px-8">
      <Reveal className="mx-auto max-w-7xl">
        <SectionHeading
          center
          eyebrow="Recursos"
          title="Um assistente para toda sua vida."
          text="O FinMb une as areas que normalmente ficam separadas e revela as relacoes entre dinheiro, tempo, alimentacao e objetivos."
        />
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {features.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.06}>
              <article className="premium-card group h-full rounded-[28px] border border-white/10 bg-white/[.045] p-7 backdrop-blur-xl sm:p-8">
                <div className="flex items-start justify-between gap-6">
                  <span className="premium-icon grid size-12 place-items-center rounded-2xl bg-gold-400 text-black">
                    <Icon className="size-5" />
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-gold-400/45 to-transparent" />
                </div>
                <h3 className="mt-9 font-display text-2xl font-semibold text-white">{title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
