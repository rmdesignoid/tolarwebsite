import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CookieConsent } from "./components/CookieConsent";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tolar.com.br"),
  title: {
    default: "Tolar | Gestão inteligente de terminais de autoatendimento",
    template: "%s | Tolar",
  },
  description: "Plataforma para monitorar terminais, gerenciar transações e escalar operações de autoatendimento com segurança, disponibilidade e controle centralizado.",
  keywords: ["gestão de terminais", "autoatendimento", "monitoramento de terminais", "gestão de transações", "pagamentos", "ETMS", "Tolar"],
  authors: [{ name: "Tolar" }],
  creator: "Tolar",
  publisher: "Tolar",
  applicationName: "Tolar",
  category: "technology",
  formatDetection: { telephone: false },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Tolar | Gestão inteligente de terminais de autoatendimento",
    description: "Monitore terminais, gerencie transações e evolua sua operação com mais disponibilidade, segurança e independência tecnológica.",
    type: "website",
    locale: "pt_BR",
    siteName: "Tolar",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Tolar — Gestão inteligente de terminais" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tolar | Gestão inteligente de terminais de autoatendimento",
    description: "Monitore terminais, gerencie transações e evolua sua operação com mais disponibilidade, segurança e independência tecnológica.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#11192c",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Tolar",
          url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tolar.com.br",
          logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://tolar.com.br"}/assets/tolar-logo.svg`,
          sameAs: ["https://www.linkedin.com/company/tolar-sistemas"],
        }) }} />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
