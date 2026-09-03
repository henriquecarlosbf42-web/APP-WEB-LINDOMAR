import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BUSINESS_NAME } from "@/lib/contact";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${BUSINESS_NAME} | Orçamento Online`,
  description:
    "Solicite seu orçamento de funilaria, pintura, polimento e pintura de rodas em poucos passos, direto do seu celular.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
