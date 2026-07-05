import { Benefits } from "@/components/landing/benefits";
import { CTA } from "@/components/landing/cta";
import { DashboardShowcase } from "@/components/landing/dashboard-showcase";
import { FAQ } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { FinBotPreview } from "@/components/landing/finbot-preview";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LandingMotionProvider } from "@/components/landing/landing-motion";
import { LifeScore } from "@/components/landing/life-score";
import { Navbar } from "@/components/landing/navbar";
import { Pricing } from "@/components/landing/pricing";
import { TrustBar } from "@/components/landing/trust-bar";

export default function HomePage() {
  return (
    <LandingMotionProvider>
      <main className="landing-page overflow-hidden bg-[#090909] text-white">
        <Navbar />
        <Hero />
        <TrustBar />
        <Features />
        <LifeScore />
        <FinBotPreview />
        <DashboardShowcase />
        <Benefits />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </LandingMotionProvider>
  );
}
