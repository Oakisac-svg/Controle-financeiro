import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  ChevronRight,
  CircleDollarSign,
  Goal,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AmbientBackground,
  FloatingPreview,
  HeroItem,
  LandingNav,
  LandingMotionProvider,
  Reveal,
  ScrollNavbar,
} from "@/components/landing/landing-motion";

const benefits = [
  { icon: BarChart3, title: "Visão sem ruído", text: "Saldo, receitas e despesas organizados em um painel que você entende em segundos." },
  { icon: Goal, title: "Metas que avançam", text: "Transforme planos em valores, prazos e progresso real — sem planilhas esquecidas." },
  { icon: Bot, title: "Decisões melhores", text: "O FinBot lê o contexto dos seus dados e sugere o próximo passo com clareza." },
];

const faqs = [
  ["Preciso entender de finanças?", "Não. O FinMb foi desenhado para traduzir números em decisões simples, sem jargão."],
  ["Meus dados ficam seguros?", "Sim. A autenticação é feita pelo Supabase e as políticas RLS isolam os dados de cada conta."],
  ["O plano gratuito tem prazo?", "Não. Você pode organizar seus lançamentos e metas gratuitamente, sem limite de tempo."],
  ["O FinBot movimenta meu dinheiro?", "Não. Ele analisa os dados cadastrados e oferece sugestões; você mantém o controle de todas as decisões."],
];

function Logo() {
  return <Link href="/" className="landing-logo group flex items-center gap-2.5 font-display text-lg font-bold"><span className="landing-logo-mark grid size-9 place-items-center rounded-xl bg-zinc-950 text-gold-300 shadow-gold dark:bg-gold-400 dark:text-black"><Sparkles className="size-4" /></span>FinMb</Link>;
}

export default function HomePage() {
  return (
    <LandingMotionProvider>
    <main className="overflow-hidden bg-[#fafaf8] text-zinc-950 dark:bg-[#090909] dark:text-zinc-50">
      <ScrollNavbar>
        <div className="landing-nav-inner mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
          <Logo />
          <LandingNav />
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link href="/auth/login">Entrar</Link></Button>
            <Button asChild className="premium-cta group rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-gold-400 dark:text-black dark:hover:bg-gold-300"><Link href="/auth/signup">Começar grátis <ArrowRight className="premium-arrow ml-1 size-4" /></Link></Button>
          </div>
        </div>
      </ScrollNavbar>

      <section className="hero-stage relative px-5 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-44">
        <AmbientBackground />
        <div className="relative mx-auto max-w-5xl text-center">
          <HeroItem index={0}><div className="hero-badge mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-50/80 px-3.5 py-1.5 text-xs font-semibold text-gold-600 backdrop-blur-md dark:bg-gold-400/10 dark:text-gold-300"><Sparkles className="hero-badge-icon size-3.5" /> Finanças pessoais, finalmente pessoais</div></HeroItem>
          <HeroItem index={1}><h1 className="hero-title font-display text-5xl font-semibold leading-[1.04] tracking-[-0.05em] sm:text-6xl lg:text-[76px]">Seu dinheiro faz mais sentido<br className="hidden sm:block" /> quando você <span className="gold-text">enxerga o todo.</span></h1></HeroItem>
          <HeroItem index={2}><p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">O FinMb reúne gastos, metas e inteligência financeira em um espaço elegante. Menos ansiedade. Mais clareza para escolher o que vem depois.</p></HeroItem>
          <HeroItem index={3} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="premium-cta group h-12 rounded-xl bg-zinc-950 px-7 text-white shadow-xl hover:bg-zinc-800 dark:bg-gold-400 dark:text-black dark:hover:bg-gold-300"><Link href="/auth/signup">Organizar minha vida financeira <ArrowRight className="premium-arrow ml-2 size-4" /></Link></Button>
            <Button asChild size="lg" variant="outline" className="premium-secondary h-12 rounded-xl border-zinc-300 bg-white/70 px-7 backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/70"><a href="#preview">Ver o produto</a></Button>
          </HeroItem>
          <HeroItem index={4}><p className="mt-4 text-xs text-zinc-500">Grátis para começar · Sem cartão de crédito</p></HeroItem>
        </div>

        <FloatingPreview><div id="preview" className="dashboard-preview relative mx-auto mt-20 max-w-6xl rounded-[28px] border border-black/10 bg-zinc-950 p-2 dark:border-white/10">
          <div className="overflow-hidden rounded-[22px] bg-[#f4f4f1] dark:bg-[#111]">
            <div className="flex h-12 items-center gap-2 border-b border-zinc-200 px-5 dark:border-zinc-800"><i className="size-2.5 rounded-full bg-red-400" /><i className="size-2.5 rounded-full bg-amber-400" /><i className="size-2.5 rounded-full bg-emerald-400" /><span className="ml-3 text-xs text-zinc-400">app.finmb.com/dashboard</span></div>
            <div className="grid min-h-[500px] grid-cols-1 md:grid-cols-[190px_1fr]">
              <aside className="hidden border-r border-zinc-200 bg-white p-5 md:block dark:border-zinc-800 dark:bg-zinc-950"><Logo /><div className="mt-10 space-y-2">{["Visão geral", "Transações", "Metas", "FinBot"].map((label, i) => <div key={label} className={`rounded-xl px-3 py-2.5 text-xs ${i === 0 ? "bg-zinc-950 text-white dark:bg-gold-400 dark:text-black" : "text-zinc-500"}`}>{label}</div>)}</div></aside>
              <div className="p-5 sm:p-8"><div className="flex items-start justify-between"><div><p className="text-xs text-zinc-500">Visão geral</p><h2 className="mt-1 font-display text-2xl font-semibold">Bom dia, Marina.</h2></div><div className="grid size-9 place-items-center rounded-full bg-gold-400 font-semibold text-black">M</div></div>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">{[["Saldo do mês", "R$ 4.820", TrendingUp], ["Despesas", "R$ 3.180", TrendingDown], ["Economia", "34%", CircleDollarSign]].map(([label,value,Icon]) => { const IconType = Icon as typeof TrendingUp; return <div key={String(label)} className="preview-stat rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><div className="flex justify-between text-xs text-zinc-500">{String(label)}<IconType className="size-4 text-gold-500" /></div><p className="mt-4 font-display text-xl font-semibold">{String(value)}</p></div>; })}</div>
                <div className="mt-3 grid gap-3 lg:grid-cols-[1.5fr_1fr]"><div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"><p className="text-sm font-semibold">Fluxo financeiro</p><div className="mt-8 flex h-36 items-end gap-3">{[42,60,48,76,58,88,70,96,78,105,92,118].map((h,i) => <div key={i} className="flex-1 rounded-t-md bg-zinc-200 dark:bg-zinc-700" style={{height:h}}><div className="w-full rounded-t-md bg-gold-400" style={{height:`${Math.max(18,h*.45)}px`}} /></div>)}</div></div><div className="rounded-2xl bg-zinc-950 p-5 text-white dark:bg-gold-400 dark:text-black"><Bot className="size-5 text-gold-300 dark:text-black" /><p className="mt-5 text-xs opacity-60">INSIGHT DO FINBOT</p><p className="mt-2 text-sm leading-6">Você economizou 18% a mais este mês. Nesse ritmo, sua reserva fica pronta 2 meses antes.</p></div></div>
              </div>
            </div>
          </div>
        </div></FloatingPreview>
      </section>

      <section id="recursos" className="border-y border-zinc-200 bg-white px-5 py-24 dark:border-zinc-800 dark:bg-zinc-950 lg:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold text-gold-500">CLAREZA EM CADA ESCOLHA</p>
          <div className="mt-3 grid gap-6 lg:grid-cols-2"><h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Tudo que importa.<br />Nada que distraia.</h2><p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">Criamos o FinMb para resolver a fragmentação: uma planilha para gastos, notas para metas e nenhuma resposta quando surge uma dúvida.</p></div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">{benefits.map(({ icon: Icon, title, text }, index) => <Reveal key={title} delay={index * 0.07} distance={20}><article className="premium-card h-full rounded-3xl border border-zinc-200 bg-[#fafaf8] p-7 dark:border-zinc-800 dark:bg-zinc-900"><div className="premium-icon grid size-11 place-items-center rounded-2xl bg-gold-400 text-black"><Icon className="size-5" /></div><h3 className="mt-7 font-display text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{text}</p></article></Reveal>)}</div>
        </Reveal>
      </section>

      <section className="px-5 py-24 lg:px-8"><Reveal className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2"><div><span className="inline-flex rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-white dark:bg-gold-400 dark:text-black">FINBOT</span><h2 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Um copiloto que conhece os seus números.</h2><p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">Pergunte onde você mais gastou, como acelerar uma meta ou quanto pode economizar. As respostas usam os lançamentos cadastrados — não conselhos genéricos.</p><ul className="mt-7 space-y-3 text-sm">{["Análises baseadas no seu mês", "Sugestões rápidas e acionáveis", "Estrutura pronta para integração com IA"].map(item => <li key={item} className="flex items-center gap-3"><Check className="size-5 rounded-full bg-gold-400 p-1 text-black" />{item}</li>)}</ul></div><div className="premium-card rounded-[28px] border border-zinc-200 bg-white p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-950"><div className="flex items-center gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800"><div className="premium-icon grid size-10 place-items-center rounded-xl bg-gold-400 text-black"><Bot className="size-5" /></div><div><p className="text-sm font-semibold">FinBot</p><p className="text-xs text-emerald-500">● Online</p></div></div><div className="space-y-4 py-6 text-sm"><div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-zinc-100 p-4 dark:bg-zinc-900">Seu gasto com assinaturas subiu 24% neste mês. Quer ver quais tiveram maior impacto?</div><div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-gold-400 p-4 text-black">Sim — e me diga quanto economizo se cancelar duas.</div><div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-zinc-100 p-4 leading-6 dark:bg-zinc-900">As duas menos utilizadas somam R$ 74/mês. Em um ano, são <strong>R$ 888</strong> — 18% da sua meta de viagem.</div></div><div className="rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-400 dark:border-zinc-800">Pergunte ao FinBot…</div></div></Reveal></section>

      <section id="como-funciona" className="bg-zinc-950 px-5 py-24 text-white dark:bg-zinc-900 lg:px-8"><Reveal className="mx-auto max-w-6xl text-center"><p className="text-sm font-semibold text-gold-300">COMECE EM MINUTOS</p><h2 className="mt-3 font-display text-4xl font-semibold">Do cadastro à clareza em três passos.</h2><div className="mt-14 grid gap-5 text-left md:grid-cols-3">{[["01","Registre", "Adicione receitas e gastos em uma interface rápida."],["02","Visualize", "Acompanhe saldo, categorias e metas em tempo real."],["03","Evolua", "Use os insights do FinBot para ajustar a rota."]].map(([n,t,d], index) => <Reveal key={n} delay={index * 0.07}><div className="premium-card h-full rounded-3xl border border-white/10 bg-white/5 p-7"><span className="font-display text-4xl text-gold-300/40">{n}</span><h3 className="mt-8 text-xl font-semibold">{t}</h3><p className="mt-2 text-sm leading-6 text-zinc-400">{d}</p></div></Reveal>)}</div></Reveal></section>

      <section id="planos" className="px-5 py-24 lg:px-8"><Reveal className="mx-auto max-w-5xl text-center"><h2 className="font-display text-4xl font-semibold">Comece leve. Cresça quando fizer sentido.</h2><p className="mt-4 text-zinc-600 dark:text-zinc-400">Sem taxas escondidas e sem transformar sua paz financeira em outra assinatura esquecida.</p><div className="mt-12 grid gap-5 text-left md:grid-cols-2"><div className="premium-card rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950"><p className="font-semibold">Free</p><p className="mt-5 font-display text-4xl font-semibold">R$ 0<span className="text-sm font-normal text-zinc-500"> / mês</span></p><p className="mt-3 text-sm text-zinc-500">Para construir sua base financeira.</p><ul className="my-7 space-y-3 text-sm">{["Dashboard financeiro", "Transações e metas", "FinBot simulado", "Tema claro e escuro"].map(x => <li key={x} className="flex gap-2"><Check className="size-4 text-gold-500" />{x}</li>)}</ul><Button asChild variant="outline" className="premium-secondary w-full rounded-xl"><Link href="/auth/signup">Começar grátis</Link></Button></div><div className="premium-card relative rounded-3xl border border-gold-400 bg-zinc-950 p-8 text-white shadow-gold"><span className="absolute right-6 top-6 rounded-full bg-gold-400 px-3 py-1 text-[10px] font-bold text-black">EM BREVE</span><p className="font-semibold">Premium</p><p className="mt-5 font-display text-4xl font-semibold">R$ 19<span className="text-sm font-normal text-zinc-400"> / mês</span></p><p className="mt-3 text-sm text-zinc-400">Para acelerar decisões e resultados.</p><ul className="my-7 space-y-3 text-sm">{["Tudo do Free", "FinBot com IA avançada", "Relatórios e projeções", "Metas ilimitadas"].map(x => <li key={x} className="flex gap-2"><Check className="size-4 text-gold-300" />{x}</li>)}</ul><Button disabled className="w-full rounded-xl bg-gold-400 text-black">Lista de espera</Button></div></div></Reveal></section>

      <section id="faq" className="border-t border-zinc-200 bg-white px-5 py-24 dark:border-zinc-800 dark:bg-zinc-950 lg:px-8"><Reveal className="mx-auto max-w-3xl"><h2 className="text-center font-display text-4xl font-semibold">Perguntas frequentes</h2><div className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">{faqs.map(([q,a]) => <details key={q} className="faq-item group py-5"><summary className="flex cursor-pointer list-none items-center justify-between font-semibold">{q}<ChevronRight className="size-4 transition-transform group-open:rotate-90" /></summary><p className="mt-3 pr-8 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{a}</p></details>)}</div></Reveal></section>

      <footer className="bg-zinc-950 px-5 py-12 text-white lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><Logo /><p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500">Tecnologia para uma relação mais clara, calma e inteligente com o dinheiro.</p></div><div className="flex gap-7 text-sm text-zinc-400"><Link href="/auth/login">Entrar</Link><a href="#planos">Planos</a><a href="#faq">FAQ</a></div></div><div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-zinc-600 sm:flex-row"><span>© {new Date().getFullYear()} FinMb. Todos os direitos reservados.</span><span>Feito para decisões que valem a pena.</span></div></footer>
    </main>
    </LandingMotionProvider>
  );
}
