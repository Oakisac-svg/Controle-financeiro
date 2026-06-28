import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = { title: "Criar conta" };

export default function SignupPage() {
  return <AuthShell title="Sua clareza começa aqui." description="Crie sua conta gratuita e monte seu primeiro panorama financeiro em poucos minutos."><SignupForm /></AuthShell>;
}
