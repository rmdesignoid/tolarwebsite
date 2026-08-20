import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tolar.com.br"),
  title: "Tolar | Gestão inteligente de terminais",
  description: "Controle toda a sua rede de autoatendimento em uma única plataforma.",
  openGraph: {
    title: "Tolar | Gestão inteligente de terminais",
    description: "Controle toda a sua rede de autoatendimento em uma única plataforma.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Tolar — Gestão inteligente de terminais" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tolar | Gestão inteligente de terminais",
    description: "Controle toda a sua rede de autoatendimento em uma única plataforma.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
