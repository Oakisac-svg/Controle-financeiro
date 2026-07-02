import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
export const metadata:Metadata={title:"Entrar no seu painel"};
export default function LoginPage(){return <AuthShell title="Entre no seu painel de vida inteligente." description="Acompanhe seu dinheiro, rotina e saúde em um só lugar."><Suspense fallback={<div className="h-80 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900"/>}><LoginForm/></Suspense></AuthShell>}
