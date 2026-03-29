"use client";

import { useState } from "react";
import { useReveal } from "@/lib/hooks";
import type { Locale } from "@/lib/i18n";

type BananaDict = { pill: string; title1: string; title2: string; desc: string; allAges: string; cta: string; price: string };

export default function BananaBoat({ dict, locale }: { dict: BananaDict; locale: Locale }) {
  const [ref, vis] = useReveal();
  const [hovered, setH] = useState(false);

  return (
    <section id="banana" ref={ref as React.RefObject<HTMLElement>} className="bg-ice pt-20 pb-5 px-5 relative">
      <div className="max-w-[1140px] mx-auto">
        <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
          className="rounded-[36px] overflow-hidden relative bg-gradient-to-br from-gold via-sun to-coral flex flex-wrap min-h-[460px] cursor-pointer shadow-[0_20px_60px_rgba(255,140,56,0.13)] transition-all duration-[1100ms] ease-expo"
          style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0) scale(1)" : "translateY(50px) scale(0.96)" }}>
          <div className="flex-[1_1_400px] min-h-[320px] relative overflow-hidden">
            <img src="https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Banana Boat en Playa Larga, Tarragona"
              className="w-full h-full object-cover transition-transform duration-[1000ms] ease-expo" style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-sun/30" />
          </div>
          <div className="flex-[1_1_380px] p-8 md:p-12 lg:p-14 flex flex-col justify-center relative z-[2]">
            <div className="inline-flex items-center gap-2 bg-white/[0.22] backdrop-blur-sm rounded-full px-[18px] py-2 w-fit font-body text-[11px] font-extrabold text-white tracking-[3px] uppercase mb-5">{dict.pill}</div>
            <h2 className="font-display text-white leading-[0.9] mb-[18px]" style={{ fontSize: "clamp(40px, 6vw, 68px)", textShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>{dict.title1}<br />{dict.title2}</h2>
            <p className="font-body text-white/[0.92] leading-[1.65] mb-8 max-w-[420px]" style={{ fontSize: "clamp(15px, 1.8vw, 18px)" }}>{dict.desc} <strong>{dict.allAges}</strong></p>
            <div className="flex gap-3 flex-wrap">
              <button className="font-body py-[15px] px-9 rounded-full border-none bg-white text-coral font-extrabold text-base cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-400 ease-expo hover:scale-105">{dict.cta}</button>
              <button className="font-body py-[15px] px-7 rounded-full border-2 border-white/50 bg-transparent text-white font-semibold text-[15px] cursor-pointer transition-all duration-300 hover:bg-white/10">{dict.price}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
