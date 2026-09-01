"use client";

import { useRef, useState } from "react";

const strategyTabs = [
  {
    title: "Saiba o que acontece em cada terminal",
    copy: "Acompanhe eventos, transações e disponibilidade da rede em tempo real.",
    image: "/assets/strategy-tab-1.png",
    webp: "/assets/strategy-tab-1.webp",
  },
  {
    title: "Integre diferentes fabricantes",
    copy: "Gerencie equipamentos de diferentes fornecedores em uma única solução.",
    image: "/assets/strategy-tab-2.png",
    webp: "/assets/strategy-tab-2.webp",
  },
  {
    title: "Resolva mais problemas à distância",
    copy: "Identifique incidentes, acione respostas e reduza deslocamentos desnecessários.",
    image: "/assets/strategy-tab-3.png",
    webp: null,
  },
  {
    title: "Transforme dados em decisões melhores",
    copy: "Tenha uma visão consolidada da operação para priorizar ações e reduzir custos.",
    image: "/assets/strategy-tab-4.png",
    webp: "/assets/strategy-tab-4.webp",
  },
] as const;

export function StrategyTabs() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedTab = strategyTabs[selectedIndex];

  function selectTab(index: number) {
    setSelectedIndex(index);
    tabRefs.current[index]?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % strategyTabs.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + strategyTabs.length) % strategyTabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = strategyTabs.length - 1;
    else return;

    event.preventDefault();
    selectTab(nextIndex);
  }

  return (
    <div className="container strategy-grid">
      <div
        className="strategy-art"
        data-reveal
        id="strategy-image-panel"
        role="tabpanel"
        aria-labelledby={`strategy-tab-${selectedIndex}`}
      >
        <picture key={selectedTab.title}>
          {selectedTab.webp && <source srcSet={selectedTab.webp} type="image/webp" />}
          <img src={selectedTab.image} width={1202} height={1298} alt={selectedTab.title} loading="lazy" decoding="async" />
        </picture>
      </div>

      <div className="strategy-copy" data-reveal="from-right">
        <p className="eyebrow">Do terminal à estratégia</p>
        <h2>Da resposta imediata à decisão estratégica.</h2>
        <div className="strategy-list" role="tablist" aria-label="Benefícios estratégicos" aria-orientation="vertical">
          {strategyTabs.map((tab, index) => {
            const isSelected = selectedIndex === index;
            return (
              <button
                key={tab.title}
                ref={(node) => { tabRefs.current[index] = node; }}
                id={`strategy-tab-${index}`}
                className={isSelected ? "strategy-tab active" : "strategy-tab"}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="strategy-image-panel"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelectedIndex(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span className="strategy-tab-heading"><strong>{tab.title}</strong></span>
                <small>{tab.copy}</small>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
