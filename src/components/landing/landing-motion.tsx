"use client";

import { Menu, X } from "lucide-react";
import { LazyMotion, MotionConfig, domAnimation, m, useInView, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const navItems = [
  { id: "recursos", label: "Recursos" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "life-score", label: "Life Score" },
  { id: "finbot", label: "FinBot" },
  { id: "planos", label: "Planos" },
  { id: "faq", label: "FAQ" },
] as const;

export function LandingMotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

export function ScrollNavbar({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 24;
    if (next !== ref.current) {
      ref.current = next;
      setScrolled(next);
    }
  });

  return (
    <m.header
      data-scrolled={scrolled}
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
      className="landing-navbar fixed inset-x-0 top-0 z-50 h-[76px]"
    >
      {children}
    </m.header>
  );
}

export function LandingNav() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const elements = navItems.map(({ id }) => document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-24% 0px -58%", threshold: [0.08, 0.25, 0.5] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav className="mx-auto hidden items-center gap-5 text-xs text-zinc-400 lg:flex" aria-label="Secoes da pagina">
        {navItems.map(({ id, label }) => (
          <a key={id} href={`#${id}`} data-active={active === id} className="landing-nav-link hover:text-white">
            {label}
            {active === id && <m.span layoutId="landing-active-section" className="absolute inset-x-0 bottom-0 h-px bg-gold-400" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
          </a>
        ))}
      </nav>
      <button
        onClick={() => setOpen((value) => !value)}
        className="ml-auto grid size-10 place-items-center rounded-full border border-white/10 bg-white/[.06] text-white lg:hidden"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      {open && (
        <div className="absolute left-4 right-4 top-[calc(100%+8px)] rounded-[26px] border border-white/10 bg-[#101010]/95 p-2 shadow-2xl backdrop-blur-2xl lg:hidden">
          {navItems.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-sm font-medium text-zinc-300 hover:bg-white/[.06]">
              {label}
            </a>
          ))}
          <div className="mt-1 grid grid-cols-2 gap-2 border-t border-white/10 p-2 pt-3">
            <a href="/auth/login" className="rounded-full border border-white/10 px-3 py-2.5 text-center text-xs font-semibold text-white">
              Entrar
            </a>
            <a href="/auth/signup" className="rounded-full bg-gold-400 px-3 py-2.5 text-center text-xs font-bold text-black">
              Comecar gratis
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export function HeroItem({ children, index, className }: { children: React.ReactNode; index: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <m.div
      initial={{ opacity: 0, y: reduced ? 0 : 24, filter: reduced ? "blur(0px)" : "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.76, delay: 0.08 + index * 0.09, ease }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function Reveal({ children, className, delay = 0, distance = 30 }: { children: React.ReactNode; className?: string; delay?: number; distance?: number }) {
  const reduced = useReducedMotion();
  return (
    <m.div
      initial={{ opacity: 0, y: reduced ? 0 : distance, filter: reduced ? "blur(0px)" : "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -70px" }}
      transition={{ duration: 0.68, delay, ease }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function FloatingCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <m.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: reduced ? 0 : [0, -12, 0], scale: 1 }}
      transition={{ opacity: { duration: 0.5, delay }, scale: { duration: 0.5, delay }, y: { duration: 5.5, delay, repeat: Infinity, ease: "easeInOut" } }}
      className={cn("floating-card absolute items-center gap-3 rounded-2xl border border-white/10 bg-white/[.075] px-4 py-3 text-sm text-white shadow-[0_18px_50px_rgba(0,0,0,.28)] backdrop-blur-2xl", className)}
    >
      {children}
    </m.div>
  );
}

export function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 52;
    const tick = () => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / total, 3);
      setCount(Math.round(value * progress));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref}>{count}</span>;
}

export function TypingText({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [length, setLength] = useState(reduced ? text.length : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setLength(index);
      if (index >= text.length) window.clearInterval(timer);
    }, 22);
    return () => window.clearInterval(timer);
  }, [inView, reduced, text.length]);

  return (
    <span ref={ref}>
      {text.slice(0, length)}
      <span className="typing-caret" aria-hidden="true" />
    </span>
  );
}

export function AmbientBackground() {
  const lines = useMemo(
    () => [
      ["12%", "16%", "38deg", "9s"],
      ["68%", "8%", "-24deg", "12s"],
      ["78%", "62%", "18deg", "11s"],
    ],
    [],
  );

  return (
    <div className="landing-ambient pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="landing-grid absolute inset-0" />
      <div className="landing-vignette absolute inset-0" />
      {lines.map(([left, top, rotate, duration], index) => (
        <i key={index} className="landing-light-line" style={{ left, top, rotate, animationDuration: duration }} />
      ))}
    </div>
  );
}
