import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";
export const metadata:Metadata={title:"Criar sua conta"};
export default function SignupPage(){return <AuthShell title="Comece sua organização pessoal com o FinMb." description="Crie sua conta e conecte finanças, rotina e alimentação em uma experiência inteligente."><SignupForm/></AuthShell>}
