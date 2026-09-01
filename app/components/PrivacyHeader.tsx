"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LanguageToggle } from "./LanguageToggle";

const Arrow = () => <span aria-hidden="true" className="arrow">›</span>;

export function PrivacyHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="privacy-header-shell"><header className={`site-header privacy-site-header${scrolled ? " is-scrolled" : ""}`}>
    <Link className="brand" href="/" aria-label="Tolar — início"><img src="/assets/tolar-logo.svg" alt="Tolar" /></Link>
    <nav className="desktop-nav" aria-label="Navegação principal"><Link href="/#plataforma">Plataforma</Link><Link href="/#beneficios">Benefícios</Link><Link href="/#modulos">Módulos</Link><Link href="/#contato">Contato</Link></nav>
    <div className="header-actions"><LanguageToggle /><Link className="button button-sm" href="/#contato">Fale com um especialista <Arrow /></Link></div>
  </header></div>;
}
