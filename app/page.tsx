"use client";

import { useEffect, useRef, useState } from "react";
import { StrategyTabs } from "./components/StrategyTabs";
import { LanguageToggle } from "./components/LanguageToggle";
import { Activity, ArrowUp, ChartSpline, CircleAlert, Clock3, Eye, Globe2, Megaphone, MonitorDown, Rocket, ScanEye, ServerCog, ShieldCheck, Store, TrendingUp, Users } from "lucide-react";

const Arrow = () => <span aria-hidden="true" className="arrow">›</span>;

const capabilities = [
  { icon: Store, title: "Multi-vendor", copy: "Conecte equipamentos de diferentes fabricantes em uma única solução." },
  { icon: MonitorDown, title: "Multi-dispositivo", copy: "Gerencie diferentes modelos de terminais e dispositivos de forma centralizada." },
  { icon: ServerCog, title: "Segurança e conformidade", copy: "Conte com suporte aos padrões de segurança exigidos pelo mercado de pagamentos." },
  { icon: TrendingUp, title: "Escalabilidade", copy: "Expanda sua rede sem aumentar a complexidade da gestão." },
  { icon: ChartSpline, title: "Flexibilidade de implantação", copy: "Escolha entre SaaS e On-Premises de acordo com os requisitos do seu negócio." },
  { icon: ScanEye, title: "Gestão centralizada", copy: "Acompanhe terminais, dispositivos e organizações em um único ambiente." },
];

const modules = [
  { name: "EJM", description: "Jornal Eletrônico de transações e eventos do terminal", icon: Eye },
  { name: "ETMS", description: "Monitoração em tempo real de dispositivos e comandos remotos ao terminal", icon: Activity },
  { name: "ItransManager", description: "Gerenciamento e roteamento de transações", icon: CircleAlert },
  { name: "RKL", description: "Regras e lógica para operações", icon: ChartSpline },
  { name: "EMV Kernel", description: "Captura e tratamento dos dados de cartões com chip certificado EMCo", icon: ShieldCheck },
  { name: "Mídia Manager", description: "Campanhas e comunicação nos terminais", icon: Megaphone },
];

const scaleStats = [
  { icon: Users, value: "+20", label: "Clientes utilizando nossos serviços" },
  { icon: Globe2, value: "+5", label: "Países na América Latina" },
  { icon: Clock3, value: "+10.000", label: "Terminais usando a solução" },
];

const navigationItems = [
  { id: "atmcentre", label: "ATMCentre" },
  { id: "plataforma", label: "Plataforma" },
  { id: "modulos", label: "Módulos" },
  { id: "contato", label: "Contato" },
] as const;

type ContactField = "nome" | "email" | "empresa" | "telefone";
type ContactErrors = Partial<Record<ContactField, string>>;
const MAX_INVALID_ATTEMPTS = 5;
const FORM_LOCK_DURATION = 5 * 60 * 1000;
const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

function validateContactForm(data: FormData): ContactErrors {
  const name = String(data.get("nome") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const company = String(data.get("empresa") ?? "").trim();
  const phone = String(data.get("telefone") ?? "").replace(/\D/g, "");
  const errors: ContactErrors = {};

  if (name.length < 2) errors.nome = "Informe seu nome completo.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Informe um e-mail corporativo válido.";
  if (company.length < 2) errors.empresa = "Informe o nome da empresa.";
  if (phone.length < 10 || phone.length > 13) errors.telefone = "Informe um telefone válido com DDD.";

  return errors;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<ContactErrors>({});
  const [formSecurityMessage, setFormSecurityMessage] = useState("");
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const [invalidAttempts, setInvalidAttempts] = useState(0);
  const [blockedUntil, setBlockedUntil] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const formOpenedAt = useRef<number | null>(null);

  useEffect(() => {
    formOpenedAt.current = Date.now();
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const viewportOffset = 144;
      const visibleSection = navigationItems.reduce<string | null>((current, item) => {
        const section = document.getElementById(item.id);
        return section && section.getBoundingClientRect().top <= viewportOffset ? item.id : current;
      }, null);
      setActiveSection(visibleSection);
    };

    const updateFromHash = () => {
      const hashSection = window.location.hash.slice(1);
      if (navigationItems.some((item) => item.id === hashSection)) setActiveSection(hashSection);
      else updateActiveSection();
    };

    updateFromHash();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateFromHash);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, []);

  function registerInvalidAttempt() {
    const attempts = invalidAttempts + 1;
    setInvalidAttempts(attempts);

    if (attempts >= MAX_INVALID_ATTEMPTS) {
      const lockExpiry = Date.now() + FORM_LOCK_DURATION;
      setBlockedUntil(lockExpiry);
      setIsBlocked(true);
      sessionStorage.setItem("tolar-contact-form-lock", String(lockExpiry));
      setFormSecurityMessage("Tente mais tarde. Por segurança, o formulário ficará indisponível por alguns minutos.");
      return;
    }

    setFormSecurityMessage("");
  }

  function handleFieldBlur(event: React.FocusEvent<HTMLInputElement>) {
    const field = event.currentTarget.name as ContactField;
    const errors = validateContactForm(new FormData(event.currentTarget.form ?? undefined));
    setFormErrors((current) => ({ ...current, [field]: errors[field] }));
  }

  async function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (isBlocked) {
      setFormSecurityMessage("Tente mais tarde. O formulário ficará disponível novamente em alguns minutos.");
      return;
    }

    const formData = new FormData(form);
    const honeypotValue = String(formData.get("website") ?? "").trim();
    const openedAt = formOpenedAt.current ?? Date.now();
    const wasFilledTooQuickly = Date.now() - openedAt < 2500;
    const errors = validateContactForm(formData);

    setFormSuccessMessage("");
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      registerInvalidAttempt();
      return;
    }

    if (honeypotValue || wasFilledTooQuickly) {
      registerInvalidAttempt();
      return;
    }

    if (!CONTACT_ENDPOINT) {
      setFormSecurityMessage("O envio de mensagens será ativado na hospedagem final da Tolar.");
      return;
    }

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: String(formData.get("nome") ?? "").trim(),
          email: String(formData.get("email") ?? "").trim(),
          empresa: String(formData.get("empresa") ?? "").trim(),
          telefone: String(formData.get("telefone") ?? "").trim(),
        }),
      });

      if (!response.ok) throw new Error("contact-send-failed");

      setFormSecurityMessage("");
      setInvalidAttempts(0);
      sessionStorage.removeItem("tolar-contact-form-lock");
      setFormSuccessMessage("Mensagem enviada com sucesso. Nossa equipe entrará em contato em breve.");
      form.reset();
      formOpenedAt.current = Date.now();
    } catch {
      setFormSecurityMessage("Não foi possível enviar sua mensagem agora. Tente novamente em instantes.");
    }
  }

  useEffect(() => {
    if (!blockedUntil) return;
    const timer = window.setInterval(() => {
      if (Date.now() < blockedUntil) return;
      window.clearInterval(timer);
      setBlockedUntil(0);
      setIsBlocked(false);
      setInvalidAttempts(0);
      setFormSecurityMessage("");
      sessionStorage.removeItem("tolar-contact-form-lock");
    }, 1000);

    return () => window.clearInterval(timer);
  }, [blockedUntil]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      document.documentElement.style.setProperty("--experience-parallax", `${Math.min(Math.max(window.scrollY - 120, 0), 360)}px`);
      document.documentElement.style.setProperty("--atmcentre-parallax", `${Math.min(Math.max(window.scrollY - 280, 0), 480) * 0.08}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.style.removeProperty("--experience-parallax");
      document.documentElement.style.removeProperty("--atmcentre-parallax");
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reveal = (element: HTMLElement) => element.classList.add("is-revealed");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }),
      { rootMargin: "0px 0px -12%", threshold: 0.2 },
    );

    document.documentElement.classList.add("js-motion");
    elements.forEach((element) => observer.observe(element));
    let initialReveal = window.requestAnimationFrame(() => {
      initialReveal = window.requestAnimationFrame(() => {
        initialRevealDelay = window.setTimeout(() => {
          elements
            .filter((element) => element.getBoundingClientRect().top < window.innerHeight * 0.9)
            .forEach(reveal);
        }, 160);
      });
    });
    let initialRevealDelay = 0;

    return () => {
      window.cancelAnimationFrame(initialReveal);
      window.clearTimeout(initialRevealDelay);
      observer.disconnect();
      document.documentElement.classList.remove("js-motion");
    };
  }, []);

  return (
    <main>
      <section className={`hero${scrolled ? " is-scrolled" : ""}`} id="inicio">
        <div className="header-slot"><header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
          <a className="brand" href="#inicio" aria-label="Tolar — início"><img src="/assets/tolar-logo.svg" alt="Tolar" /></a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigationItems.map((item) => <a key={item.id} className={activeSection === item.id ? "active" : undefined} href={`#${item.id}`} aria-current={activeSection === item.id ? "page" : undefined} onClick={() => setActiveSection(item.id)}>{item.label}</a>)}
          </nav>
          <div className="header-actions"><LanguageToggle /><a className="button button-sm" href="#contato">Fale com um especialista <Arrow /></a></div>
        </header></div>
        <picture className="hero-image">
          <source srcSet="/assets/hero-terminals.webp" type="image/webp" />
          <img src="/assets/hero-terminals.png" width={1024} height={576} alt="" fetchPriority="high" decoding="async" />
        </picture><div className="hero-shade" aria-hidden="true" />
        <div className="container hero-content">
          <p className="eyebrow" data-reveal>Gestão inteligente de terminais</p>
          <h1 data-reveal>Controle toda a sua rede de autoatendimento em uma <span>única plataforma</span></h1>
          <p className="hero-copy" data-reveal>Monitore terminais, gerencie transações e evolua sua operação com mais disponibilidade, segurança e independência tecnológica.</p>
          <div className="hero-ctas" data-reveal><a className="button" href="#contato">Fale com um especialista <Arrow /></a></div>
          <div className="spin-off" data-reveal><div className="hst-mark"><img src="/assets/hst-main.svg" alt="HST" /></div><p>A Tolar é um <strong>spin-off da HST Card Technology</strong>, empresa com mais de 35 anos de experiência em pagamentos, terminais e infraestrutura de autoatendimento.</p></div>
        </div>
      </section>

      <section className="atmcentre-section" id="atmcentre">
        <div className="container atmcentre-grid">
          <div className="atmcentre-copy" data-reveal>
            <p className="eyebrow dark">ATMCENTRE</p>
            <h2>Uma plataforma para toda a sua rede de autoatendimento.</h2>
            <p>O ATMCentre conecta e supervisiona ATMs, cofres inteligentes e outros dispositivos de autoatendimento em um único ambiente. Uma base única para acompanhar sua rede com independência tecnológica.</p>
            <a className="button" href="#contato">Conheça o ATMCentre <Arrow /></a>
          </div>
          <div className="atmcentre-image" data-reveal="from-right">
            <picture>
              <source srcSet="/assets/atmcentre-atm-cofre.webp" type="image/webp" />
              <img src="/assets/atmcentre-atm-cofre.png" width={1286} height={1040} alt="ATM e cofre inteligente conectados pela solução Tolar" loading="lazy" decoding="async" />
            </picture>
          </div>
        </div>
      </section>

      <section className="experience" id="beneficios">
        <div className="container experience-grid">
          <div className="experience-copy" data-reveal>
            <p className="eyebrow dark">Do produto ao resultado</p>
            <h2>Mais controle na operação. Mais confiança para decidir.</h2>
            <p>Com o ATMCentre, dados de terminais, transações e dispositivos se transformam em uma visão acionável da operação. Sua equipe monitora a rede, responde com mais agilidade e toma decisões com mais segurança.</p>
            <div className="certifications"><strong>Certificações</strong><p className="certification-lead">Garantia de segurança e confiança nas transações digitais</p><div><ShieldCheck size={22} strokeWidth={2.2} aria-hidden="true" /><span>EMVCo Kernel</span></div><div><ShieldCheck size={22} strokeWidth={2.2} aria-hidden="true" /><span>PCI SFF</span></div></div>
          </div>
          <div className="experience-visual" data-reveal="from-right"><div className="experience-image-frame"><picture><source srcSet="/assets/terminal-user.webp" type="image/webp" /><img src="/assets/terminal-user.png" width={1560} height={1440} alt="Pessoa utilizando um terminal de autoatendimento" loading="lazy" decoding="async" /></picture></div><div className="visual-rail" aria-hidden="true"><span>↔</span><span>⌘</span><span className="rail-active">T</span><span>▣</span><span>▥</span></div></div>
        </div>
      </section>

      <section className="strategy-section"><StrategyTabs /></section>

      <section className="platform-section" id="plataforma">
        <div className="container"><div className="section-heading" data-reveal><p className="eyebrow dark">Mais controle para a sua operação</p><h2>Uma plataforma para acompanhar a complexidade da <span className="gradient-text">sua operação</span></h2></div>
          <div className="capability-layout"><div className="capability-grid">{capabilities.map(({ icon: Icon, title, copy }) => <article className="capability-card" data-reveal key={title}><span className="capability-icon"><Icon size={24} strokeWidth={1.7} aria-hidden="true" /></span><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="dashboard-card platform-visual" data-reveal="from-right" aria-label="Pronto para evoluir sua operação"><picture><source srcSet="/assets/platform-card.webp" type="image/webp" /><img src="/assets/platform-card.png" width={928} height={1248} alt="Terminal Tolar" loading="lazy" decoding="async" /></picture><div className="platform-visual-overlay"><Rocket className="platform-rocket" size={32} strokeWidth={1.5} aria-hidden="true" /><h3>Pronto para evoluir sua operação?</h3><p>Descubra como a Tolar pode conectar seus terminais, simplificar a gestão e preparar sua rede para crescer com mais controle.</p><a className="button" href="#contato">Fale com um especialista <Arrow /></a></div></div></div>
        </div>

        <div className="modules-wrap" id="modulos"><div className="container modules-grid"><div data-reveal><p className="eyebrow">Um ecossistema conectado</p><h2>Combine os módulos que sua operação precisa.</h2><p>Evolua sua infraestrutura com flexibilidade. Combine módulos conforme os desafios da sua rede e amplie as possibilidades de autoatendimento ao longo do tempo.</p><a className="button light-button" href="#contato">Conheça a plataforma <Arrow /></a></div><div className="module-list">{modules.map(({ name, description, icon: Icon }) => <div data-reveal="from-right" key={name}><span className="module-icon"><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></span><div className="module-copy"><strong>{name}</strong><small>{description}</small></div></div>)}</div></div></div>
      </section>

      <section className="scale-section"><div className="container"><div className="scale-heading" data-reveal><p className="eyebrow dark">Experiência comprovada em escala</p><h2>Experiência para operar em escala</h2></div><div className="stats-grid">{scaleStats.map(({ icon: Icon, value, label }) => <article data-reveal key={label}><Icon className="stats-icon" size={24} strokeWidth={1.8} aria-hidden="true" /><b>{value}</b><span>{label}</span></article>)}</div></div></section>

      <section className="contact-section" id="contato"><div className="container contact-panel"><div className="contact-copy" data-reveal><span className="contact-symbol">T</span><h2>Entenda como a Tolar pode simplificar sua operação</h2><p>Fale com nosso time e descubra quais módulos fazem sentido para o cenário da sua empresa.</p><div className="contact-hst"><div className="hst-mark"><img src="/assets/hst-main.svg" alt="HST" /></div><span>Spin-off da HST Card Technology, com mais de 35 anos de experiência no ecossistema de autoatendimento</span></div></div><form className="contact-form" data-reveal="from-right" onSubmit={handleContactSubmit} noValidate><p>Preencha o formulário e nossa equipe entrará em contato para entender sua operação e apresentar a melhor configuração para o seu cenário.</p><label className={formErrors.nome ? "has-error" : ""}>Nome<input type="text" name="nome" placeholder="Seu nome" autoComplete="name" aria-invalid={Boolean(formErrors.nome)} aria-describedby={formErrors.nome ? "nome-error" : undefined} onBlur={handleFieldBlur} />{formErrors.nome && <small id="nome-error" className="field-error">{formErrors.nome}</small>}</label><label className={formErrors.email ? "has-error" : ""}>E-mail corporativo<input type="email" name="email" placeholder="nome@empresa.com" autoComplete="email" aria-invalid={Boolean(formErrors.email)} aria-describedby={formErrors.email ? "email-error" : undefined} onBlur={handleFieldBlur} />{formErrors.email && <small id="email-error" className="field-error">{formErrors.email}</small>}</label><div className="form-row"><label className={formErrors.empresa ? "has-error" : ""}>Empresa<input type="text" name="empresa" placeholder="Nome da empresa" autoComplete="organization" aria-invalid={Boolean(formErrors.empresa)} aria-describedby={formErrors.empresa ? "empresa-error" : undefined} onBlur={handleFieldBlur} />{formErrors.empresa && <small id="empresa-error" className="field-error">{formErrors.empresa}</small>}</label><label className={formErrors.telefone ? "has-error" : ""}>Telefone<input type="tel" name="telefone" placeholder="(00) 00000-0000" autoComplete="tel" aria-invalid={Boolean(formErrors.telefone)} aria-describedby={formErrors.telefone ? "telefone-error" : undefined} onBlur={handleFieldBlur} />{formErrors.telefone && <small id="telefone-error" className="field-error">{formErrors.telefone}</small>}</label></div><label className="form-honeypot" aria-hidden="true">Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>{formSecurityMessage && <p className="form-security-message" role="alert">{formSecurityMessage}</p>}{formSuccessMessage && <p className="form-success-message" role="status">{formSuccessMessage}</p>}<button className="button" type="submit" disabled={isBlocked}>{isBlocked ? "Tente mais tarde" : <>Fale com um especialista <Arrow /></>}</button></form></div></section>

      <footer><div className="container footer-grid"><div className="footer-intro"><div className="footer-brand"><img src="/assets/tolar-logo.svg" alt="Tolar" /></div><p>Gestão inteligente para operações de autoatendimento mais seguras, disponíveis e escaláveis.</p><a className="footer-social" href="https://www.linkedin.com/company/tolar-sistemas" target="_blank" rel="noreferrer"><span className="linkedin-mark" aria-hidden="true">in</span> LinkedIn</a></div><div className="footer-links"><div><strong>Legal</strong><a href="/politica-de-privacidade">Política de privacidade</a><a href="/assets/relatorio-igualdade-2026.pdf" target="_blank" rel="noreferrer">Relatório de igualdade</a></div><div><strong>Contato</strong><a href="#contato">Fale com um especialista</a><a href="mailto:contato@tolar.com.br">contato@tolar.com.br</a></div></div><a className="footer-top" href="#inicio" aria-label="Voltar ao topo"><ArrowUp size={18} aria-hidden="true" /> Topo</a></div><div className="container footer-bottom"><p>© 2026 Tolar. Todos os direitos reservados.</p><span>HST Card Technology</span></div></footer>
    </main>
  );
}
