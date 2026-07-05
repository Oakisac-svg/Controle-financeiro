import { Bot, Send, Sparkles } from "lucide-react";
import { Reveal, TypingText } from "@/components/landing/landing-motion";
import { SectionHeading } from "@/components/landing/section-heading";

const prompts = ["Quanto economizei este mes?", "Como melhorar meu Life Score?", "Quanto gastei com delivery?"];

export function FinBotPreview() {
  return (
    <section id="finbot" className="landing-section px-5 py-28 lg:px-8">
      <Reveal className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
        <div className="order-2 lg:order-1">
          <div className="premium-card overflow-hidden rounded-[34px] border border-white/10 bg-[#101010] shadow-[0_40px_130px_rgba(0,0,0,.38)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-gold-400 text-black">
                  <Bot className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">FinBot</p>
                  <p className="text-xs text-zinc-500">Contexto financeiro, rotina e nutricao</p>
                </div>
              </div>
              <span className="rounded-full border border-gold-400/25 bg-gold-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-300">
                Online
              </span>
            </div>
            <div className="space-y-4 p-5 sm:p-7">
              <Message right text="Quanto economizei este mes?" />
              <Message text="Voce economizou R$ 420 em comparacao ao mes anterior. O maior ganho veio da reducao em delivery." />
              <Message right text="Como melhorar meu Life Score?" />
              <div className="max-w-[88%] rounded-3xl rounded-bl-md border border-gold-400/20 bg-gold-400/10 p-4 text-sm leading-7 text-zinc-100">
                <TypingText text="Plano rapido: limite delivery a 2 pedidos, conclua 4 habitos principais e mova R$ 300 para sua meta de reserva." />
              </div>
              <div className="mt-6 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-zinc-500">
                Pergunte sobre seu dia...
                <Send className="ml-auto size-4 text-gold-300" />
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="FinBot"
            title="Respostas que entendem sua vida."
            text="O FinBot cruza padroes que voce dificilmente veria sozinho: gastos, rotina, refeicoes, metas e consistencia diaria."
          />
          <div className="mt-8 grid gap-3">
            {prompts.map((prompt) => (
              <div key={prompt} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm text-zinc-300">
                <Sparkles className="size-4 text-gold-300" />
                {prompt}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Message({ text, right = false }: { text: string; right?: boolean }) {
  return (
    <div className={`max-w-[88%] rounded-3xl p-4 text-sm leading-7 ${right ? "ml-auto rounded-br-md bg-gold-400 text-black" : "rounded-bl-md bg-white/[.07] text-zinc-200"}`}>
      {text}
    </div>
  );
}
