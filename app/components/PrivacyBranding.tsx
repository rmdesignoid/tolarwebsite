"use client";

import { useEffect } from "react";

export function PrivacyBranding() {
  useEffect(() => {
    const replaceBrand = () => {
      const root = document.querySelector(".privacy-page");
      if (!root) return;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);
      nodes.forEach((node) => {
        if (node.parentElement?.closest(".privacy-header")) return;
        const nextValue = (node.nodeValue ?? "").replace(/HST/g, "Tolar").replace(/hst\.com\.br/gi, "tolar.com.br");
        if (nextValue !== node.nodeValue) node.nodeValue = nextValue;
      });
      root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
        anchor.href = anchor.href.replace(/hst\.com\.br/gi, "tolar.com.br");
      });
    };
    replaceBrand();
    const observer = new MutationObserver(replaceBrand);
    const root = document.querySelector(".privacy-page");
    if (root) observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
