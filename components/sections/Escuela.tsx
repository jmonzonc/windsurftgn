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
    <section id="escuela" ref={ref as React.RefObject<HTMLElement>} className="bg-ice py-14 sm:py-20 md:py-28 px-4 sm:px-5 relative overflow-hidden">
      <div className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] rounded-full bg-turq/[0.024] blur-[100px] pointer-events-none" />
      <div className="max-w-[1140px] mx-auto relative z-[1]">
        <div className="mb-8 md:mb-14" style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          <div className="section-pill bg-ocean/[0.04] border border-ocean/[0.08] text-ocean text-[10px] sm:text-xs">{dict.pill}</div>
          <h2 className="font-display text-midnight leading-[0.95] m-0" style={{ fontSize: "clamp(30px, 6vw, 64px)" }}>{dict.title1} <br /><span className="gradient-text-ocean">{dict.title2}</span></h2>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-7">
          {/* Tabs - horizontal scroll on mobile with fade hint */}
          <div className="relative md:min-w-[240px] flex-[0_0_auto]"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s" }}>
            <div className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
              {KEYS.map((k, i) => {
                const c = dict.courses[k];
                const isActive = i === active;
                return (
                  <button key={k} onClick={() => setActive(i)}
                    className={`font-body flex items-center gap-2.5 sm:gap-3.5 py-2.5 sm:py-[15px] px-4 sm:px-[22px] rounded-[14px] sm:rounded-[18px] border-2 cursor-pointer text-left whitespace-nowrap md:whitespace-normal transition-all duration-[350ms] ease-out bg-transparent shrink-0 ${isActive ? "border-ocean/20 !bg-white shadow-[0_6px_24px_rgba(0,104,214,0.05)]" : "border-transparent hover:bg-white/50"}`}>
                    <span className="text-xl sm:text-2xl" style={{ filter: isActive ? "none" : "grayscale(0.5)" }}>{EMOJIS[k]}</span>
                    <span className={`text-[13px] sm:text-[15px] ${isActive ? "font-bold text-midnight" : "font-medium text-gray-400"}`}>{c.name}</span>
                    {isActive && <div className={`ml-auto w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-gradient-to-br ${accent} shadow-[0_0_8px_rgba(0,212,170,0.27)] hidden sm:block`} />}
                  </button>
                );
              })}
            </div>
            {/* Fade hint for mobile scroll */}
            <div className="absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-ice to-transparent pointer-events-none md:hidden" />
          </div>
          {/* Card */}
          <div key={active} className="flex-1 min-w-0 rounded-[24px] sm:rounded-[32px] overflow-hidden bg-white shadow-[0_12px_48px_rgba(0,104,214,0.05)] animate-card-reveal">
            <div className="relative overflow-hidden h-[200px] sm:h-[260px] md:h-[320px] lg:h-[380px]">
              <img src={COURSE_IMAGES[key]} alt={course.name} width={900} height={600} className="w-full h-full object-cover animate-img-zoom" />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 to-transparent" />
              <div className={`absolute top-4 left-4 sm:top-5 sm:left-5 bg-gradient-to-br ${accent} text-white py-1.5 sm:py-2 px-4 sm:px-5 rounded-full font-body font-extrabold text-[10px] sm:text-[11px] tracking-[1.5px] sm:tracking-[2px] uppercase shadow-lg`}>{dict.allLevels}</div>
            </div>
            <div className="p-5 sm:p-7 md:p-9">
              <h3 className="font-display text-[24px] sm:text-[30px] text-midnight mb-2">{EMOJIS[key]} {course.name}</h3>
              <p className="font-body text-sm sm:text-base text-gray-500 leading-[1.55] sm:leading-[1.65] mb-5 sm:mb-7">{course.desc}</p>
              <div className="flex gap-2.5 sm:gap-3 flex-wrap">
                <Link href={`/${locale}/escuela/${key}`} className={`btn-primary py-2.5 sm:py-[13px] px-5 sm:px-[30px] text-[13px] sm:text-[15px] no-underline bg-gradient-to-br ${accent}`}>{dict.book}</Link>
                <Link href={`/${locale}/escuela/${key}`} className="font-body py-2.5 sm:py-[13px] px-4 sm:px-6 rounded-full border-2 border-ocean/[0.1] bg-transparent text-ocean font-semibold text-[12px] sm:text-sm no-underline transition-all duration-300 hover:bg-ocean/[0.04]">{dict.moreInfo}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
