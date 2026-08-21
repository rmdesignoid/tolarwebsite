"use client";

import { useEffect, useState } from "react";

const pairs: Record<string, string> = {
  "PT BR": "PT BR", ENG: "ENG", Plataforma: "Platform", Benefícios: "Benefits", Módulos: "Modules", Contato: "Contact",
  "Fale com um especialista": "Talk to a specialist", "Avalie sua operação": "Assess your operation",
  "Gestão inteligente de terminais": "Intelligent terminal management",
  "Controle toda a sua rede de autoatendimento em uma": "Control your entire self-service network on a",
  "única plataforma": "single platform",
  "Monitore terminais, gerencie transações e evolua sua operação com mais disponibilidade, segurança e independência tecnológica.": "Monitor terminals, manage transactions and evolve your operation with greater availability, security and technological independence.",
  "A Tolar é um": "Tolar is a", "spin-off da HST Card Technology": "spin-off of HST Card Technology",
  "empresa com ampla experiência em pagamentos, terminais e infraestrutura de autoatendimento.": "a company with extensive experience in payments, terminals and self-service infrastructure.",
  "Experiência que conecta tecnologia e operação": "Experience connecting technology and operations",
  "Da operação diária às decisões estratégicas": "From daily operations to strategic decisions",
  "A Tolar conecta dados de terminais, transações e dispositivos em um único ambiente para que sua equipe tenha mais controle sobre a operação e mais segurança para evoluir.": "Tolar connects terminal, transaction and device data in one environment, giving your team more control and the confidence to evolve.",
  "Presente em operações que não podem parar": "Present in operations that cannot stop",
  Certificações: "Certifications", "Garantia de segurança e confiança nas transações digitais": "Security and confidence in digital transactions",
  "EMVCo Kernel": "EMVCo Kernel", "PCI SFF": "PCI SFF",
  "Do terminal à estratégia": "From terminal to strategy",
  "Mais controle sobre a operação. Mais velocidade para evoluir.": "More control over operations. More speed to evolve.",
  "Saiba o que acontece em cada terminal": "Know what is happening at every terminal",
  "Acompanhe eventos, transações e disponibilidade da rede em tempo real.": "Track events, transactions and network availability in real time.",
  "Integre diferentes fabricantes": "Integrate different manufacturers",
  "Gerencie equipamentos de diferentes fornecedores em uma única solução.": "Manage equipment from different suppliers in a single solution.",
  "Resolva mais problemas à distância": "Solve more problems remotely",
  "Identifique incidentes, acione respostas e reduza deslocamentos desnecessários.": "Identify incidents, trigger responses and reduce unnecessary travel.",
  "Transforme dados em decisões melhores": "Turn data into better decisions",
  "Tenha uma visão consolidada da operação para priorizar ações e reduzir custos.": "Get a consolidated view of operations to prioritize actions and reduce costs.",
  "Mais controle para a sua operação": "More control for your operation",
  "Uma plataforma para acompanhar a complexidade da": "A platform to manage the complexity of",
  "sua operação": "your operation",
  "Uma plataforma para acompanhar a complexidade da sua operação": "A platform to manage the complexity of your operation",
  "Multi-vendor": "Multi-vendor", "Conecte equipamentos de diferentes fabricantes em uma única solução.": "Connect equipment from different manufacturers in a single solution.",
  "Multi-dispositivo": "Multi-device", "Gerencie diferentes modelos de terminais e dispositivos de forma centralizada.": "Manage different terminal models and devices centrally.",
  "Segurança e conformidade": "Security and compliance", "Conte com suporte aos padrões de segurança exigidos pelo mercado de pagamentos.": "Rely on support for security standards required by the payments market.",
  "Escalabilidade": "Scalability", "Expanda sua rede sem aumentar a complexidade da gestão.": "Expand your network without increasing management complexity.",
  "Flexibilidade de implantação": "Deployment flexibility", "Escolha entre SaaS e On-Premises de acordo com os requisitos do seu negócio.": "Choose SaaS or On-Premises according to your business requirements.",
  "Gestão centralizada": "Centralized management", "Acompanhe terminais, dispositivos e organizações em um único ambiente.": "Monitor terminals, devices and organizations in one environment.",
  "Pronto para evoluir sua operação?": "Ready to evolve your operation?",
  "Descubra como a Tolar pode conectar seus terminais, simplificar a gestão e preparar sua rede para crescer com mais controle.": "Discover how Tolar can connect your terminals, simplify management and prepare your network to grow with more control.",
  "Um ecossistema conectado": "A connected ecosystem", "Combine os módulos que sua operação precisa.": "Combine the modules your operation needs.",
  "Evolua sua infraestrutura com flexibilidade. Combine módulos conforme os desafios da sua rede e amplie as possibilidades de autoatendimento ao longo do tempo.": "Evolve your infrastructure with flexibility. Combine modules around your network's challenges and expand self-service capabilities over time.",
  "Conheça a plataforma": "Explore the platform", "Experiência comprovada em escala": "Proven experience at scale", "Experiência para operar em escala": "Experience to operate at scale",
  "Clientes utilizando nossos serviços": "Clients using our services", "Países em 3 continentes": "Countries across 3 continents", "Anos de experiência em pagamentos": "Years of experience in payments", "Principais bancos da América Latina": "Leading banks in Latin America",
  "Entenda como a Tolar pode simplificar sua operação": "See how Tolar can simplify your operation", "Fale com nosso time e descubra quais módulos fazem sentido para o cenário da sua empresa.": "Talk to our team and discover which modules fit your company's needs.",
  "Spin-off da HST Card Technology, com mais de 35 anos de experiência no ecossistema de autoatendimento": "HST Card Technology spin-off, with more than 35 years of experience in the self-service ecosystem",
  "Preencha o formulário e nossa equipe entrará em contato para entender sua operação e apresentar a melhor configuração para o seu cenário.": "Fill out the form and our team will contact you to understand your operation and present the best configuration for your needs.",
  Nome: "Name", "E-mail corporativo": "Business email", Empresa: "Company", Telefone: "Phone", "Seu nome": "Your name", "nome@empresa.com": "name@company.com", "Nome da empresa": "Company name", "(00) 00000-0000": "(00) 00000-0000",
  "© 2026 Tolar. Todos os direitos reservados.": "© 2026 Tolar. All rights reserved.",
  "Gestão inteligente para operações de autoatendimento mais seguras, disponíveis e escaláveis.": "Intelligent management for safer, more available and scalable self-service operations.",
  Explorar: "Explore", Início: "Home", "Fale com um especialista": "Talk to a specialist", "contato@tolar.com.br": "contato@tolar.com.br", Topo: "Top",
  "HST Card Technology": "HST Card Technology",
};

const reversePairs = Object.fromEntries(Object.entries(pairs).map(([pt, en]) => [en, pt]));
let translating = false;

function translateDocument(lang: "pt" | "en") {
  if (translating) return;
  translating = true;
  const dictionary = lang === "en" ? pairs : reversePairs;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    if (node.parentElement?.closest(".locale")) return;
    const value = node.nodeValue ?? "";
    const trimmed = value.trim();
    if (!trimmed || !dictionary[trimmed]) return;
    const nextValue = value.replace(trimmed, dictionary[trimmed]);
    if (nextValue !== value) node.nodeValue = nextValue;
  });
  document.querySelectorAll<HTMLInputElement>("input[placeholder]").forEach((input) => {
    const translated = dictionary[input.placeholder];
    if (translated) input.placeholder = translated;
  });
  document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  translating = false;
}

export function LanguageToggle() {
  const [language, setLanguage] = useState<"pt" | "en">("pt");

  useEffect(() => {
    if (language !== "en") return;
    const observer = new MutationObserver(() => translateDocument("en"));
    observer.observe(document.body, { childList: true, subtree: true });
    translateDocument("en");
    return () => observer.disconnect();
  }, [language]);

  const setLang = (next: "pt" | "en") => {
    setLanguage(next);
    if (next === "pt") window.location.reload();
  };

  return <div className="locale" aria-label="Language"><button type="button" className={language === "pt" ? "active" : ""} onClick={() => setLang("pt")}>PT BR</button><button type="button" className={language === "en" ? "active" : ""} onClick={() => setLang("en")}>ENG</button></div>;
}
