import Link from "next/link";
import { Globe2, Mail, MessageCircle } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

const links = [
  ["Recursos", "#recursos"],
  ["Como funciona", "#como-funciona"],
  ["Life Score", "#life-score"],
  ["FinBot", "#finbot"],
  ["Planos", "#planos"],
  ["FAQ", "#faq"],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-12 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <BrandLogo className="text-lg" imageClassName="size-11" />
          <p className="mt-4 max-w-md text-sm leading-7 text-zinc-500">
            IA, Open Finance e organizacao de vida em uma experiencia minimalista, premium e segura.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-400" aria-label="Rodape">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="hover:text-gold-300">
              {label}
            </a>
          ))}
          <Link href="/auth/login" className="hover:text-gold-300">
            Entrar
          </Link>
        </nav>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-5 border-t border-white/10 pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center">
        <span>(c) {new Date().getFullYear()} FinMb. Todos os direitos reservados.</span>
        <div className="flex gap-3">
          {[Globe2, Mail, MessageCircle].map((Icon, index) => (
            <a key={index} href="#" aria-label="Canal FinMb" className="grid size-9 place-items-center rounded-full border border-white/10 text-zinc-500 hover:border-gold-400/40 hover:text-gold-300">
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
