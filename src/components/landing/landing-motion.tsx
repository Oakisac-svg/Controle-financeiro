"use client";

import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

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
  const scrolledRef = useRef(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 28;
    if (next !== scrolledRef.current) {
      scrolledRef.current = next;
      setScrolled(next);
    }
  });

  return (
    <m.header
      data-scrolled={scrolled}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
      className="landing-navbar fixed inset-x-0 top-0 z-50"
    >
      {children}
    </m.header>
  );
}

const navItems = [
  { id: "recursos", label: "Recursos" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "planos", label: "Planos" },
  { id: "faq", label: "FAQ" },
];

export function LandingNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -55%", threshold: [0.08, 0.25, 0.5] },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="hidden items-center gap-7 text-sm text-zinc-600 md:flex dark:text-zinc-400" aria-label="Seções da página">
      {navItems.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          data-active={active === id}
          className="landing-nav-link hover:text-zinc-950 dark:hover:text-white"
        >
          {label}
          {active === id && (
            <m.span
              layoutId="landing-active-section"
              className="absolute inset-x-0 bottom-0 h-px bg-gold-400"
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            />
          )}
        </a>
      ))}
    </nav>
  );
}

export function HeroItem({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      initial={{ opacity: 0, y: reduced ? 0 : 22, scale: reduced ? 1 : 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.72, delay: 0.1 + index * 0.09, ease }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      initial={{ opacity: 0, y: reduced ? 0 : distance, scale: reduced ? 1 : 0.992 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -60px" }}
      transition={{ duration: 0.68, delay, ease }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function FloatingPreview({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [34, 0, -24]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.975, 1, 0.992]);
  const shadow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "0 28px 70px rgba(0,0,0,.15)",
      "0 55px 130px rgba(0,0,0,.24)",
      "0 32px 80px rgba(0,0,0,.17)",
    ],
  );

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: reduced ? 0 : 40, scale: reduced ? 1 : 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, delay: 0.18, ease }}
      style={reduced ? undefined : { y, scale, boxShadow: shadow }}
      className="will-change-transform"
    >
      {children}
    </m.div>
  );
}

const particles = [
  [8, 22, 0, 15],
  [17, 72, -4, 19],
  [28, 39, -8, 17],
  [42, 82, -3, 21],
  [55, 16, -11, 18],
  [66, 61, -6, 23],
  [76, 31, -13, 20],
  [88, 74, -9, 16],
] as const;

export function AmbientBackground() {
  return (
    <div className="landing-ambient pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="landing-grid absolute inset-0" />
      <div className="landing-orb landing-orb-one" />
      <div className="landing-orb landing-orb-two" />
      {particles.map(([left, top, delay, duration], index) => (
        <i
          key={index}
          className={cn("landing-particle", index % 3 === 0 && "landing-particle-lg")}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        />
      ))}
    </div>
  );
}
