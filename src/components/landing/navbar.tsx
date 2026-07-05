import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { LandingNav, ScrollNavbar } from "@/components/landing/landing-motion";

export function Navbar() {
  return (
    <ScrollNavbar>
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="landing-nav-shell flex w-full items-center gap-4 rounded-full border border-white/10 bg-[#111111]/72 px-3 py-2 shadow-[0_18px_70px_rgba(0,0,0,.34)] backdrop-blur-2xl sm:px-4">
          <BrandLogo className="text-base" imageClassName="size-10" />
          <LandingNav />
          <div className="ml-auto hidden items-center gap-2 sm:flex">
            <Button asChild variant="ghost" className="h-10 rounded-full px-4 text-zinc-300 hover:bg-white/8 hover:text-white">
              <Link href="/auth/login">Entrar</Link>
            </Button>
            <Button asChild className="premium-cta h-10 rounded-full bg-gold-400 px-5 text-black hover:bg-gold-300">
              <Link href="/auth/signup">
                Comecar gratis <ArrowRight className="premium-arrow ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </ScrollNavbar>
  );
}
