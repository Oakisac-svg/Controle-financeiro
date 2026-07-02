import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Providers } from "@/components/providers";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
export const metadata: Metadata = { title: { default: "FinMb — Dinheiro, rotina e saúde em um só lugar", template: "%s | FinMb" }, description: "Organize finanças, hábitos, tarefas e alimentação com ajuda de IA e acompanhe sua evolução com o Life Score.", keywords: ["finanças pessoais", "hábitos", "rotina", "alimentação", "Life Score", "inteligência artificial"], openGraph: { title: "FinMb — Dinheiro, rotina e saúde em um só lugar", description: "Organize finanças, hábitos, tarefas e alimentação com ajuda de IA e acompanhe sua evolução com o Life Score.", type: "website", locale: "pt_BR" } };
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#090909" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR" suppressHydrationWarning><body className={`${inter.variable} ${manrope.variable} antialiased`}><Providers>{children}</Providers></body></html>; }
