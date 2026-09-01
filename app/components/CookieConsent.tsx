"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

type CookiePreferences = { necessary: true; analytics: boolean; marketing: boolean };
const STORAGE_KEY = "tolar-cookie-preferences";

export function CookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [isManaging, setIsManaging] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<CookiePreferences>;
        window.setTimeout(() => {
          if (cancelled) return;
          setPreferences({ necessary: true, analytics: parsed.analytics === true, marketing: parsed.marketing === true });
          setAnalytics(parsed.analytics === true);
          setMarketing(parsed.marketing === true);
        }, 0);
      }
    } catch {
      // If storage is unavailable, show the banner without blocking navigation.
    }
    return () => { cancelled = true; };
  }, []);

  function save(next: CookiePreferences) {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* storage may be blocked */ }
    setPreferences(next);
    setIsManaging(false);
  }

  if (preferences && !isManaging) {
    return <button className="cookie-settings-trigger" type="button" onClick={() => setIsManaging(true)} aria-label="Configurações de cookies" title="Configurações de cookies"><Cookie size={17} strokeWidth={1.8} aria-hidden="true" /></button>;
  }

  return <aside className="cookie-consent" aria-label="Preferências de cookies">
    <div className="cookie-consent-copy">
      <p className="cookie-consent-title">Sua privacidade importa</p>
      <p>Usamos cookies necessários para o funcionamento do site. Cookies opcionais de análise e publicidade só serão ativados com a sua escolha. <Link href="/politica-de-privacidade">Saiba mais na Política de Privacidade</Link>.</p>
    </div>
    {isManaging && <div className="cookie-options">
      <label><span><strong>Necessários</strong><small>Essenciais para o site funcionar.</small></span><input type="checkbox" checked disabled aria-label="Cookies necessários" /></label>
      <label><span><strong>Análise</strong><small>Ajuda a entender o uso do site.</small></span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} aria-label="Cookies de análise" /></label>
      <label><span><strong>Publicidade</strong><small>Permite comunicações e anúncios personalizados.</small></span><input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} aria-label="Cookies de publicidade" /></label>
    </div>}
    <div className="cookie-consent-actions">
      {!isManaging && <button type="button" className="cookie-button cookie-button-secondary" onClick={() => save({ necessary: true, analytics: false, marketing: false })}>Rejeitar não necessários</button>}
      {!isManaging && <button type="button" className="cookie-button cookie-button-secondary" onClick={() => setIsManaging(true)}>Gerenciar cookies</button>}
      {isManaging && <button type="button" className="cookie-button cookie-button-secondary" onClick={() => save({ necessary: true, analytics: false, marketing: false })}>Rejeitar não necessários</button>}
      <button type="button" className="cookie-button cookie-button-primary" onClick={() => save({ necessary: true, analytics, marketing })}>{isManaging ? "Salvar preferências" : "Aceitar todos"}</button>
    </div>
  </aside>;
}
