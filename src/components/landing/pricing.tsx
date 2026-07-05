import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/landing/landing-motion";
import { SectionHeading } from "@/components/landing/section-heading";

const plans = [
  {
    name: "Free",
    price: "R$ 0",
    description: "Para comecar a organizar o essencial.",
    highlighted: false,
    items: ["Controle financeiro basico", "Habitos e tarefas iniciais", "Registro de refeicoes", "Life Score basico"],
  },
  {
    name: "Pro",
    price: "R$ 19,90",
    description: "Para transformar rotina em progresso.",
    highlighted: true,
    items: ["Financas ilimitadas", "Rotina e nutricao completas", "FinBot com insights", "Life Score avancado", "Relatorios semanais"],
  },
  {
    name: "Premium",
    price: "R$ 39,90",
    description: "Para uma experiencia completa e prioritaria.",
    highlighted: false,
    items: ["Tudo do Pro", "Analises mais profundas", "Automacoes futuras", "Prioridade em novidades", "Suporte premium"],
  },
] as const;

export function Pricing() {
  return (
    <section id="planos" className="landing-section px-5 py-28 lg:px-8">
      <Reveal className="mx-auto max-w-7xl">
        <SectionHeading
          center
          eyebrow="Planos"
          title="Comece leve. Evolua sem limites."
          text="Escolha o nivel ideal para organizar sua vida agora e desbloquear mais inteligencia conforme sua rotina cresce."
        />
        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.06}>
              <article className={`premium-card relative h-full rounded-[30px] p-7 ${plan.highlighted ? "border border-gold-400 bg-gold-400 text-black shadow-[0_28px_90px_rgba(212,175,55,.2)]" : "border border-white/10 bg-white/[.045] text-white"}`}>
                {plan.highlighted && (
                  <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-300">
                    <Sparkles className="size-3" /> Melhor escolha
                  </span>
                )}
                <h3 className="font-display text-2xl font-semibold">{plan.name}</h3>
                <p className={`mt-4 text-sm leading-6 ${plan.highlighted ? "text-black/65" : "text-zinc-400"}`}>{plan.description}</p>
                <p className="mt-8 font-display text-5xl font-semibold">
                  {plan.price}
                  <span className={`text-sm font-medium ${plan.highlighted ? "text-black/55" : "text-zinc-500"}`}> / mes</span>
                </p>
                <ul className="my-8 space-y-3 text-sm">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className={`size-4 ${plan.highlighted ? "text-black" : "text-gold-300"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild className={`w-full rounded-full ${plan.highlighted ? "bg-black text-white hover:bg-zinc-900" : "premium-cta bg-gold-400 text-black hover:bg-gold-300"}`}>
                  <Link href="/auth/signup">Comecar gratis</Link>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
