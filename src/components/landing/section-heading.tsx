import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  text: string;
  center?: boolean;
  className?: string;
};

export function SectionHeading({ eyebrow, title, text, center = false, className }: SectionHeadingProps) {
  return (
    <div className={cn(center ? "mx-auto max-w-3xl text-center" : "max-w-2xl", className)}>
      <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-400">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">{text}</p>
    </div>
  );
}
