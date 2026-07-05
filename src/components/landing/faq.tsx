import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/landing/landing-motion";
import { SectionHeading } from "@/components/landing/section-heading";

const faqs = [
  ["O FinMb e so controle financeiro?", "Nao. Ele conecta financas, rotina, alimentacao, metas, Life Score e FinBot em uma unica experiencia."],
  ["Preciso conectar banco para usar?", "Nao. Voce pode comecar manualmente e manter controle total sobre o que entra na plataforma."],
  ["O que e Life Score?", "E uma nota de 0 a 100 que resume sua consistencia em financas, rotina, alimentacao e metas."],
  ["Como o FinBot ajuda?", "Ele interpreta seus registros e responde perguntas praticas sobre gastos, habitos, refeicoes e progresso."],
  ["Funciona bem no celular?", "Sim. A landing e a experiencia foram pensadas para mobile, tablet, desktop e telas grandes."],
] as const;

export function FAQ() {
  return (
    <section id="faq" className="landing-section px-5 py-28 lg:px-8">
      <Reveal className="mx-auto max-w-4xl">
        <SectionHeading center eyebrow="FAQ" title="Perguntas frequentes" text="O essencial para entender como o FinMb organiza sua vida sem complicar." />
        <div className="mt-12 divide-y divide-white/10 rounded-[30px] border border-white/10 bg-white/[.04] px-5 backdrop-blur-xl sm:px-7">
          {faqs.map(([question, answer]) => (
            <details key={question} className="faq-item group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold text-white">
                {question}
                <ChevronRight className="size-4 shrink-0 text-gold-300 transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400">{answer}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
