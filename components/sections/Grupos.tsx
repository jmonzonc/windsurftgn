"use client";

import { useState } from "react";
import Link from "next/link";
import { useReveal } from "@/lib/hooks";
import type { Locale } from "@/lib/i18n";

type GroupItem = { title: string; desc: string };
type GruposDict = { title1: string; title2: string; title3: string; cta: string; items: Record<string, GroupItem> };

const KEYS = ["colegios", "team-building", "amigos", "despedidas"] as const;
const EMOJIS: Record<string, string> = { colegios: "🏫", "team-building": "🏢", amigos: "👯", despedidas: "💍" };

export default function Grupos({ dict, locale }: { dict: GruposDict; locale: Locale }) {
  const [ref, vis] = useReveal();

  return (
    <section id="grupos" ref={ref as React.RefObject<HTMLElement>} className="bg-gradient-to-b from-sand via-white to-ice py-14 sm:py-20 md:py-28 px-4 sm:px-5 relative overflow-hidden">
      <div className="max-w-[960px] mx-auto text-center relative z-[1]">
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          <h2 className="font-display text-midnight leading-none mb-8 md:mb-14" style={{ fontSize: "clamp(28px, 5.5vw, 56px)" }}>
            {dict.title1} <span className="gradient-text-ocean">{dict.title2}</span>{dict.title3}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-[18px]">
          {KEYS.map((key, i) => {
            const g = dict.items[key];
            return <GroupCard key={key} emoji={EMOJIS[key]} title={g.title} desc={g.desc} vis={vis} delay={0.15 + i * 0.1} />;
          })}
        </div>
        <div className="mt-8 md:mt-14" style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s" }}>
          <Link href={`/${locale}/grupos`} className="btn-primary py-3.5 sm:py-[17px] px-8 sm:px-12 text-[15px] sm:text-[17px] font-extrabold no-underline inline-block shadow-[0_10px_36px_rgba(0,104,214,0.16)] hover:-translate-y-1 hover:scale-[1.04]">{dict.cta}</Link>
        </div>
      </div>
    </section>
  );
}

function GroupCard({ emoji, title, desc, vis, delay }: { emoji: string; title: string; desc: string; vis: boolean; delay: number }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      className="bg-white rounded-[20px] sm:rounded-[28px] px-4 sm:px-6 pt-7 sm:pt-10 pb-6 sm:pb-9 cursor-pointer transition-all duration-500 ease-expo"
      style={{ boxShadow: h ? "0 12px 36px rgba(0,104,214,0.07)" : "0 2px 16px rgba(0,104,214,0.024)", border: h ? "1px solid rgba(0,212,170,0.2)" : "1px solid rgba(0,104,214,0.03)", opacity: vis ? 1 : 0, transform: vis ? (h ? "translateY(-6px)" : "translateY(0)") : "translateY(30px)", transitionDelay: vis ? "0ms" : `${delay * 1000}ms` }}>
      <div className="text-[32px] sm:text-[44px] mb-2 sm:mb-4 transition-transform duration-400 ease-expo" style={{ transform: h ? "scale(1.15) rotate(-5deg)" : "scale(1)" }}>{emoji}</div>
      <h3 className="font-display text-base sm:text-xl text-midnight mb-1 sm:mb-2">{title}</h3>
      <p className="font-body text-xs sm:text-sm text-gray-400 leading-[1.4] sm:leading-[1.5]">{desc}</p>
    </div>
  );
}
