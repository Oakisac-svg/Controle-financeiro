import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Providers } from "@/components/providers";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: { default: "FinMb — Clareza para o seu dinheiro", template: "%s | FinMb" },
  description: "Organize gastos, acompanhe metas e receba análises inteligentes com o FinBot.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#090909" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
