"use client";

import { useEffect, useState } from "react";
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

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      document.documentElement.style.setProperty("--experience-parallax", `${Math.min(Math.max(window.scrollY - 120, 0), 360)}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.style.removeProperty("--experience-parallax");
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
      { rootMargin: "0px 0px -8%", threshold: 0.15 },
    );

    document.documentElement.classList.add("js-motion");
    elements.forEach((element) => observer.observe(element));
    const initialReveal = window.requestAnimationFrame(() => {
      elements
        .filter((element) => element.getBoundingClientRect().top < window.innerHeight * 0.9)
        .forEach(reveal);
    });

    return () => {
      window.cancelAnimationFrame(initialReveal);
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
            <a className="active" href="#plataforma">Plataforma</a><a href="#beneficios">Benefícios</a><a href="#modulos">Módulos</a><a href="#contato">Contato</a>
          </nav>
          <div className="header-actions"><LanguageToggle /><a className="button button-sm" href="#contato">Fale com um especialista <Arrow /></a></div>
        </header></div>
        <div className="hero-image" aria-hidden="true" /><div className="hero-shade" aria-hidden="true" />
        <div className="container hero-content">
          <p className="eyebrow" data-reveal>Gestão inteligente de terminais</p>
          <h1 data-reveal>Controle toda a sua rede de autoatendimento em uma <span>única plataforma</span></h1>
          <p className="hero-copy" data-reveal>Monitore terminais, gerencie transações e evolua sua operação com mais disponibilidade, segurança e independência tecnológica.</p>
          <div className="hero-ctas" data-reveal><a className="button" href="#contato">Fale com um especialista <Arrow /></a><a className="button button-outline" href="#beneficios">Avalie sua operação <Arrow /></a></div>
          <div className="spin-off" data-reveal><div className="hst-mark"><img src="/assets/hst-main.svg" alt="HST" /></div><p>A Tolar é um <strong>spin-off da HST Card Technology</strong>, empresa com ampla experiência em pagamentos, terminais e infraestrutura de autoatendimento.</p></div>
        </div>
      </section>

      <section className="experience" id="beneficios">
        <div className="container experience-grid">
          <div className="experience-copy" data-reveal>
            <p className="eyebrow dark">Experiência que conecta tecnologia e operação</p>
            <h2>Da operação diária às decisões estratégicas</h2>
            <p>A Tolar conecta dados de terminais, transações e dispositivos em um único ambiente para que sua equipe tenha mais controle sobre a operação e mais segurança para evoluir.</p>
            <div className="certifications"><strong>Certificações</strong><p className="certification-lead">Garantia de segurança e confiança nas transações digitais</p><div><ShieldCheck size={22} strokeWidth={2.2} aria-hidden="true" /><span>EMVCo Kernel</span></div><div><ShieldCheck size={22} strokeWidth={2.2} aria-hidden="true" /><span>PCI SFF</span></div></div>
          </div>
          <div className="experience-visual" data-reveal="from-right"><div className="experience-image-frame"><img src="/assets/terminal-user.png" alt="Pessoa utilizando um terminal de autoatendimento" /></div><div className="visual-rail" aria-hidden="true"><span>↔</span><span>⌘</span><span className="rail-active">T</span><span>▣</span><span>▥</span></div></div>
        </div>
      </section>

      <section className="strategy-section"><StrategyTabs /></section>

      <section className="platform-section" id="plataforma">
        <div className="container"><div className="section-heading" data-reveal><p className="eyebrow dark">Mais controle para a sua operação</p><h2>Uma plataforma para acompanhar a complexidade da <span className="gradient-text">sua operação</span></h2></div>
          <div className="capability-layout"><div className="capability-grid">{capabilities.map(({ icon: Icon, title, copy }) => <article className="capability-card" data-reveal key={title}><span className="capability-icon"><Icon size={24} strokeWidth={1.7} aria-hidden="true" /></span><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="dashboard-card platform-visual" data-reveal="from-right" aria-label="Pronto para evoluir sua operação"><img src="/assets/platform-card.png" alt="Terminal Tolar" /><div className="platform-visual-overlay"><Rocket className="platform-rocket" size={32} strokeWidth={1.5} aria-hidden="true" /><h3>Pronto para evoluir sua operação?</h3><p>Descubra como a Tolar pode conectar seus terminais, simplificar a gestão e preparar sua rede para crescer com mais controle.</p><a className="button" href="#contato">Fale com um especialista <Arrow /></a></div></div></div>
        </div>

        <div className="modules-wrap" id="modulos"><div className="container modules-grid"><div data-reveal><p className="eyebrow">Um ecossistema conectado</p><h2>Combine os módulos que sua operação precisa.</h2><p>Evolua sua infraestrutura com flexibilidade. Combine módulos conforme os desafios da sua rede e amplie as possibilidades de autoatendimento ao longo do tempo.</p><a className="button light-button" href="#contato">Conheça a plataforma <Arrow /></a></div><div className="module-list">{modules.map(({ name, description, icon: Icon }) => <div data-reveal="from-right" key={name}><span className="module-icon"><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></span><div className="module-copy"><strong>{name}</strong><small>{description}</small></div></div>)}</div></div></div>
      </section>

      <section className="scale-section"><div className="container"><div className="scale-heading" data-reveal><p className="eyebrow dark">Experiência comprovada em escala</p><h2>Experiência para operar em escala</h2></div><div className="stats-grid">{scaleStats.map(({ icon: Icon, value, label }) => <article data-reveal key={label}><Icon className="stats-icon" size={24} strokeWidth={1.8} aria-hidden="true" /><b>{value}</b><span>{label}</span></article>)}</div></div></section>

      <section className="contact-section" id="contato"><div className="container contact-panel"><div className="contact-copy" data-reveal><span className="contact-symbol">T</span><h2>Entenda como a Tolar pode simplificar sua operação</h2><p>Fale com nosso time e descubra quais módulos fazem sentido para o cenário da sua empresa.</p><div className="contact-hst"><div className="hst-mark"><img src="/assets/hst-main.svg" alt="HST" /></div><span>Spin-off da HST Card Technology, com mais de 35 anos de experiência no ecossistema de autoatendimento</span></div></div><form className="contact-form" data-reveal="from-right" onSubmit={(event) => { event.preventDefault(); event.currentTarget.reportValidity(); }}><p>Preencha o formulário e nossa equipe entrará em contato para entender sua operação e apresentar a melhor configuração para o seu cenário.</p><label>Nome<input type="text" name="nome" placeholder="Seu nome" autoComplete="name" required minLength={2} /></label><label>E-mail corporativo<input type="email" name="email" placeholder="nome@empresa.com" autoComplete="email" required /></label><div className="form-row"><label>Empresa<input type="text" name="empresa" placeholder="Nome da empresa" autoComplete="organization" required minLength={2} /></label><label>Telefone<input type="tel" name="telefone" placeholder="(00) 00000-0000" autoComplete="tel" required pattern="[0-9()\s+-]{8,}" /></label></div><button className="button" type="submit">Fale com um especialista <Arrow /></button></form></div></section>

      <footer><div className="container footer-grid"><div className="footer-intro"><div className="footer-brand"><img src="/assets/tolar-logo.svg" alt="Tolar" /></div><p>Gestão inteligente para operações de autoatendimento mais seguras, disponíveis e escaláveis.</p><a className="footer-social" href="https://www.linkedin.com/company/tolar-gestao-inteligente/" target="_blank" rel="noreferrer"><span className="linkedin-mark" aria-hidden="true">in</span> LinkedIn</a></div><div className="footer-links"><div><strong>Explorar</strong><a href="#inicio">Início</a><a href="#beneficios">Benefícios</a><a href="#plataforma">Plataforma</a><a href="#modulos">Módulos</a></div><div><strong>Contato</strong><a href="#contato">Fale com um especialista</a><a href="mailto:contato@tolar.com.br">contato@tolar.com.br</a></div></div><a className="footer-top" href="#inicio" aria-label="Voltar ao topo"><ArrowUp size={18} aria-hidden="true" /> Topo</a></div><div className="container footer-bottom"><p>© 2026 Tolar. Todos os direitos reservados.</p><span>HST Card Technology</span></div></footer>
    </main>
  );
}
