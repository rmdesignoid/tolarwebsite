const Arrow = () => <span aria-hidden="true" className="arrow">›</span>;

const strategy = [
  ["Saiba o que acontece em cada terminal", "Acompanhe eventos, transações e disponibilidade da rede em tempo real."],
  ["Integre diferentes fabricantes", "Gerencie equipamentos de diferentes fornecedores em uma única solução."],
  ["Resolva mais problemas à distância", "Identifique incidentes, acione respostas e reduza deslocamentos desnecessários."],
  ["Transforme dados em decisões melhores", "Tenha uma visão consolidada da operação para priorizar ações e reduzir custos."],
];

const capabilities = [
  ["01", "Multi-vendor", "Conecte equipamentos de diferentes fabricantes em uma única solução."],
  ["02", "Multi-dispositivo", "Gerencie diferentes modelos de terminais e dispositivos de forma centralizada."],
  ["03", "Segurança e conformidade", "Conte com suporte aos padrões de segurança exigidos pelo mercado de pagamentos."],
  ["04", "Escalabilidade", "Expanda sua rede sem aumentar a complexidade da gestão."],
  ["05", "Flexibilidade de implantação", "Escolha entre SaaS e On-Premises de acordo com os requisitos do seu negócio."],
  ["06", "Gestão centralizada", "Acompanhe terminais, dispositivos e organizações em um único ambiente."],
];

const modules = ["EJM", "ETMS", "ItransManager", "RKL", "EMV Kernel", "Mídia Manager"];

export default function Home() {
  return (
    <main>
      <section className="hero" id="inicio">
        <header className="site-header">
          <a className="brand" href="#inicio" aria-label="Tolar — início"><img src="/assets/tolar-logo.svg" alt="Tolar" /></a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a className="active" href="#plataforma">Plataforma</a><a href="#beneficios">Benefícios</a><a href="#modulos">Módulos</a><a href="#contato">Contato</a>
          </nav>
          <div className="header-actions"><div className="locale" aria-label="Idioma"><span>PT BR</span><span>ENG</span></div><a className="button button-sm" href="#contato">Fale com um especialista <Arrow /></a></div>
        </header>
        <div className="hero-image" aria-hidden="true" /><div className="hero-shade" aria-hidden="true" />
        <div className="container hero-content">
          <p className="eyebrow">Gestão inteligente de terminais</p>
          <h1>Controle toda a sua rede de autoatendimento em uma <span>única plataforma</span></h1>
          <p className="hero-copy">Monitore terminais, gerencie transações e evolua sua operação com mais disponibilidade, segurança e independência tecnológica.</p>
          <div className="hero-ctas"><a className="button" href="#contato">Fale com um especialista <Arrow /></a><a className="button button-outline" href="#beneficios">Avalie sua operação <Arrow /></a></div>
          <div className="spin-off"><div className="hst-mark"><img src="/assets/hst-main.svg" alt="HST" /></div><p>A Tolar é um <strong>spin-off da HST Card Technology</strong>, empresa com ampla experiência em pagamentos, terminais e infraestrutura de autoatendimento.</p></div>
        </div>
      </section>

      <section className="experience" id="beneficios">
        <div className="container experience-grid">
          <div className="experience-copy">
            <p className="eyebrow dark">Experiência que conecta tecnologia e operação</p>
            <h2>Da operação diária às decisões estratégicas</h2>
            <p>A Tolar conecta dados de terminais, transações e dispositivos em um único ambiente para que sua equipe tenha mais controle sobre a operação e mais segurança para evoluir.</p>
            <strong>Presente em operações que não podem parar</strong>
            <div className="client-logos"><img src="/assets/client-bancard.png" alt="Bancard" /><img src="/assets/client-atm24.png" alt="ATM 24h" /><img src="/assets/client-bepsa.png" alt="Bepsa" /></div>
          </div>
          <div className="experience-visual"><img src="/assets/terminal-user.png" alt="Pessoa utilizando um terminal de autoatendimento" /><div className="visual-rail" aria-hidden="true"><span>↔</span><span>⌘</span><span className="rail-active">T</span><span>▣</span><span>▥</span></div></div>
        </div>
      </section>

      <section className="strategy-section">
        <div className="container strategy-grid">
          <div className="strategy-art" aria-hidden="true"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="core-mark">T</div></div>
          <div className="strategy-copy">
            <p className="eyebrow">Do terminal à estratégia</p><h2>Mais controle sobre a operação. Mais velocidade para evoluir.</h2>
            <div className="strategy-list">{strategy.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
          </div>
        </div>
      </section>

      <section className="platform-section" id="plataforma">
        <div className="container"><div className="section-heading"><p className="eyebrow dark">Mais controle para a sua operação</p><h2>Uma plataforma para acompanhar a complexidade da sua operação</h2></div>
          <div className="capability-layout"><div className="capability-grid">{capabilities.map(([number,title,copy]) => <article className="capability-card" key={title}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="dashboard-card" aria-label="Visão consolidada da plataforma"><div className="dashboard-top"><i/><i/><i/></div><div className="dashboard-chart"><span/><span/><span/><span/><span/><span/></div><div className="dashboard-stats"><div><b>98,7%</b><small>Disponibilidade</small></div><div><b>1.284</b><small>Terminais online</small></div></div></div></div>
        </div>

        <div className="modules-wrap" id="modulos"><div className="container modules-grid"><div><p className="eyebrow">Um ecossistema conectado</p><h2>Combine os módulos que sua operação precisa.</h2><p>Evolua sua infraestrutura com flexibilidade. Combine módulos conforme os desafios da sua rede e amplie as possibilidades de autoatendimento ao longo do tempo.</p><a className="button light-button" href="#contato">Conheça a plataforma <Arrow /></a></div><div className="module-list">{modules.map((name,index)=><div key={name}><span>{String(index+1).padStart(2,"0")}</span><strong>{name}</strong><Arrow /></div>)}</div></div></div>
      </section>

      <section className="scale-section"><div className="container"><div className="scale-heading"><p className="eyebrow dark">Experiência comprovada em escala</p><h2>Experiência para operar em escala</h2></div><div className="stats-grid"><article><b>+130</b><span>Clientes utilizando nossos serviços</span></article><article><b>+19</b><span>Países em 3 continentes</span></article><article><b>+35</b><span>Anos de experiência em pagamentos</span></article><article><b>10</b><span>Principais bancos da América Latina</span></article></div></div></section>

      <section className="contact-section" id="contato"><div className="container contact-panel"><div className="contact-copy"><span className="contact-symbol">T</span><h2>Entenda como a Tolar pode simplificar sua operação</h2><p>Fale com nosso time e descubra quais módulos fazem sentido para o cenário da sua empresa.</p><div className="contact-hst"><div className="hst-mark"><img src="/assets/hst-main.svg" alt="HST" /></div><span>Spin-off da HST Card Technology, com mais de 35 anos de experiência no ecossistema de autoatendimento</span></div></div><form className="contact-form"><p>Preencha o formulário e nossa equipe entrará em contato para entender sua operação e apresentar a melhor configuração para o seu cenário.</p><label>Nome<input type="text" name="nome" placeholder="Seu nome" autoComplete="name" /></label><label>E-mail corporativo<input type="email" name="email" placeholder="nome@empresa.com" autoComplete="email" /></label><div className="form-row"><label>Empresa<input type="text" name="empresa" placeholder="Nome da empresa" autoComplete="organization" /></label><label>Telefone<input type="tel" name="telefone" placeholder="(00) 00000-0000" autoComplete="tel" /></label></div><button className="button" type="button">Fale com um especialista <Arrow /></button></form></div></section>

      <footer><div className="footer-brand"><img src="/assets/tolar-logo.svg" alt="Tolar" /></div><p>© 2026 Tolar. Todos os direitos reservados.</p></footer>
    </main>
  );
}
