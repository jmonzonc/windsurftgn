"use client";

import { useState } from "react";
import Link from "next/link";
import { useReveal } from "@/lib/hooks";
import { COURSE_IMAGES } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

type CourseData = { name: string; desc: string };
type EscuelaDict = {
  pill: string; title1: string; title2: string; allLevels: string;
  book: string; moreInfo: string;
  courses: Record<string, CourseData>;
};

const KEYS = ["windsurf", "vela", "surf", "wakesurf", "catamaran", "patin-catalan"] as const;
const EMOJIS: Record<string, string> = { windsurf: "🏄", vela: "⛵", surf: "🌊", wakesurf: "🏂", catamaran: "🛥️", "patin-catalan": "🚩" };
const ACCENT: Record<string, string> = { windsurf: "from-turq to-ocean", vela: "from-ocean to-deep", surf: "from-blue-500 to-ocean", wakesurf: "from-coral to-sun", catamaran: "from-gold to-sun", "patin-catalan": "from-sun to-coral" };

export default function Escuela({ dict, locale }: { dict: EscuelaDict; locale: Locale }) {
  const [ref, vis] = useReveal();
  const [active, setActive] = useState(0);
  const key = KEYS[active];
  const course = dict.courses[key];
  const accent = ACCENT[key];

  return (
    <section id="escuela" ref={ref as React.RefObject<HTMLElement>} className="bg-ice py-24 md:py-28 px-5 relative overflow-hidden">
      <div className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] rounded-full bg-turq/[0.024] blur-[100px] pointer-events-none" />
      <div className="max-w-[1140px] mx-auto relative z-[1]">
        <div className="mb-14" style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          <div className="section-pill bg-ocean/[0.04] border border-ocean/[0.08] text-ocean">{dict.pill}</div>
          <h2 className="font-display text-midnight leading-[0.95] m-0" style={{ fontSize: "clamp(36px, 6vw, 64px)" }}>{dict.title1} <br /><span className="gradient-text-ocean">{dict.title2}</span></h2>
        </div>
        <div className="flex gap-7 flex-wrap">
          <div className="flex flex-row md:flex-col gap-2 md:gap-1.5 flex-[0_0_auto] md:min-w-[240px] overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s" }}>
            {KEYS.map((k, i) => {
              const c = dict.courses[k];
              const isActive = i === active;
              return (
                <button key={k} onClick={() => setActive(i)}
                  className={`font-body flex items-center gap-3.5 py-[15px] px-[22px] rounded-[18px] border-2 cursor-pointer text-left whitespace-nowrap md:whitespace-normal transition-all duration-[350ms] ease-out bg-transparent ${isActive ? "border-ocean/20 !bg-white shadow-[0_6px_24px_rgba(0,104,214,0.05)]" : "border-transparent hover:bg-white/50"}`}>
                  <span className="text-2xl" style={{ filter: isActive ? "none" : "grayscale(0.5)" }}>{EMOJIS[k]}</span>
                  <span className={`text-[15px] ${isActive ? "font-bold text-midnight" : "font-medium text-gray-400"}`}>{c.name}</span>
                  {isActive && <div className={`ml-auto w-2.5 h-2.5 rounded-full bg-gradient-to-br ${accent} shadow-[0_0_8px_rgba(0,212,170,0.27)]`} />}
                </button>
              );
            })}
          </div>
          <div key={active} className="flex-1 min-w-[280px] md:min-w-[320px] rounded-[32px] overflow-hidden bg-white shadow-[0_12px_48px_rgba(0,104,214,0.05)] animate-card-reveal">
            <div className="relative overflow-hidden" style={{ height: "clamp(280px, 30vw, 380px)" }}>
              <img src={COURSE_IMAGES[key]} alt={course.name} className="w-full h-full object-cover animate-img-zoom" />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 to-transparent" />
              <div className={`absolute top-5 left-5 bg-gradient-to-br ${accent} text-white py-2 px-5 rounded-full font-body font-extrabold text-[11px] tracking-[2px] uppercase shadow-lg`}>{dict.allLevels}</div>
            </div>
            <div className="p-8 md:p-9">
              <h3 className="font-display text-[30px] text-midnight mb-2.5">{EMOJIS[key]} {course.name}</h3>
              <p className="font-body text-base text-gray-500 leading-[1.65] mb-7">{course.desc}</p>
              <div className="flex gap-3 flex-wrap">
                <Link href={`/${locale}/escuela/${key}`} className={`btn-primary py-[13px] px-[30px] text-[15px] no-underline bg-gradient-to-br ${accent}`}>{dict.book}</Link>
                <Link href={`/${locale}/escuela/${key}`} className="font-body py-[13px] px-6 rounded-full border-2 border-ocean/[0.1] bg-transparent text-ocean font-semibold text-sm no-underline transition-all duration-300 hover:bg-ocean/[0.04]">{dict.moreInfo}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
