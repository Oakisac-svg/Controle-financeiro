import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, CircleDollarSign, Goal, Salad, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AmbientBackground, FloatingCard, HeroItem, TypingText } from "@/components/landing/landing-motion";

const floatingCards = [
  { label: "Life Score", value: "86", icon: TrendingUp, className: "left-0 top-[16%] hidden lg:flex" },
  { label: "Saldo livre", value: "R$ 4.280", icon: CircleDollarSign, className: "right-0 top-[9%] hidden lg:flex" },
  { label: "Habitos", value: "5/6 hoje", icon: CheckCircle2, className: "left-[3%] bottom-[24%] hidden md:flex" },
  { label: "Refeicoes", value: "1.820 kcal", icon: Salad, className: "right-[2%] bottom-[28%] hidden md:flex" },
  { label: "Metas", value: "72%", icon: Goal, className: "right-[20%] bottom-[8%] hidden lg:flex" },
];

export function Hero() {
  return (
    <section className="hero-stage relative min-h-screen px-5 pb-24 pt-32 sm:pt-36 lg:px-8 lg:pt-40">
      <AmbientBackground />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:min-h-[760px] lg:grid-cols-[1.02fr_.98fr]">
        <div>
          <HeroItem index={0}>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-400/10 px-4 py-2 text-xs font-semibold text-gold-300 backdrop-blur-xl">
              <Sparkles className="size-3.5" />
              IA premium para Open Finance e organizacao de vida
            </div>
          </HeroItem>
          <HeroItem index={1}>
            <h1 className="mt-8 max-w-5xl font-display text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[88px]">
              A IA que organiza sua vida financeira, rotina e alimentacao em um so lugar.
            </h1>
          </HeroItem>
          <HeroItem index={2}>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
              O FinMb transforma dados do dia a dia em clareza: dinheiro, habitos, refeicoes, metas e insights conectados por um assistente inteligente.
            </p>
          </HeroItem>
          <HeroItem index={3} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="premium-cta h-12 rounded-full bg-gold-400 px-7 text-black hover:bg-gold-300">
              <Link href="/auth/signup">
                Comecar gratis <ArrowRight className="premium-arrow ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="premium-secondary h-12 rounded-full border-white/15 bg-white/5 px-7 text-white hover:bg-white/10">
              <a href="#finbot">Ver FinBot</a>
            </Button>
          </HeroItem>
          <HeroItem index={4}>
            <p className="mt-5 text-sm text-zinc-500">Sem cartao de credito. Dados sob seu controle. Experiencia mobile-first.</p>
          </HeroItem>
        </div>

        <HeroItem index={2} className="relative mx-auto w-full max-w-[580px]">
          <div className="relative mx-auto aspect-[.56] w-[min(76vw,330px)] rounded-[46px] border border-white/12 bg-[#050505] p-3 shadow-[0_36px_120px_rgba(0,0,0,.58)]">
            <div className="absolute left-1/2 top-3 h-5 w-28 -translate-x-1/2 rounded-full bg-black" />
            <div className="h-full overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,#171717,#080808)] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-300">FinBot</p>
                  <p className="mt-1 text-lg font-semibold">Life Assistant</p>
                </div>
                <span className="grid size-10 place-items-center rounded-2xl bg-gold-400 text-black">
                  <Bot className="size-5" />
                </span>
              </div>
              <div className="mt-8 space-y-4">
                <ChatBubble text="Quanto economizei este mes?" align="right" />
                <ChatBubble text="Voce economizou R$ 420 e manteve 82% dos habitos nos dias com menor gasto." />
                <ChatBubble text="Como melhorar meu Life Score?" align="right" />
                <div className="rounded-3xl rounded-bl-md border border-gold-400/20 bg-gold-400/10 p-4 text-sm leading-6 text-gold-50">
                  <TypingText text="Priorize 2 metas: reduzir delivery em 18% e planejar 4 refeicoes na semana." />
                </div>
              </div>
              <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-zinc-500">
                Pergunte sobre seu dinheiro...
              </div>
            </div>
          </div>

          {floatingCards.map(({ label, value, icon: Icon, className }, index) => (
            <FloatingCard key={label} delay={index * 0.45} className={className}>
              <Icon className="size-4 text-gold-300" />
              <span>
                <small>{label}</small>
                <strong>{value}</strong>
              </span>
            </FloatingCard>
          ))}
        </HeroItem>
      </div>
    </section>
  );
}

function ChatBubble({ text, align }: { text: string; align?: "right" }) {
  return (
    <div className={`max-w-[88%] rounded-3xl p-4 text-sm leading-6 ${align === "right" ? "ml-auto rounded-br-md bg-gold-400 text-black" : "rounded-bl-md bg-white/[.07] text-zinc-200"}`}>
      {text}
    </div>
  );
}
