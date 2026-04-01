"use client";

import { useState } from "react";
import Link from "next/link";
import { useReveal } from "@/lib/hooks";
import { SITE } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

type BananaDict = {
  pill: string; title1: string; title2: string;
  desc: string; allAges: string; cta: string; price: string;
};

export default function BananaBoat({ dict, locale }: { dict: BananaDict; locale: Locale }) {
  const [ref, vis] = useReveal();
  const [hovered, setH] = useState(false);

  return (
    <section id="banana" ref={ref as React.RefObject<HTMLElement>} className="bg-ice pt-10 sm:pt-14 md:pt-20 pb-4 px-4 sm:px-5 relative">
      <div className="max-w-[1140px] mx-auto">
        <div
          onMouseEnter={() => setH(true)}
          onMouseLeave={() => setH(false)}
          className="rounded-[24px] sm:rounded-[36px] overflow-hidden relative bg-gradient-to-br from-gold via-sun to-coral flex flex-col sm:flex-row min-h-0 sm:min-h-[420px] md:min-h-[460px] shadow-[0_20px_60px_rgba(255,140,56,0.13)] transition-all duration-[1100ms] ease-expo"
          style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0) scale(1)" : "translateY(50px) scale(0.96)" }}
        >
          <div className="flex-[1_1_auto] sm:flex-[1_1_400px] h-[220px] sm:h-auto sm:min-h-[320px] relative overflow-hidden">
            <img
              src="https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Banana Boat en Playa Larga, Tarragona"
              width={900} height={600}
              className="w-full h-full object-cover transition-transform duration-[1000ms] ease-expo"
              style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-transparent via-transparent to-sun/30" />
          </div>
          <div className="flex-[1_1_auto] sm:flex-[1_1_380px] p-6 sm:p-8 md:p-12 lg:p-14 flex flex-col justify-center relative z-[2]">
            <h2
              className="font-display text-white leading-[0.9] mb-3 sm:mb-[18px]"
              style={{ fontSize: "clamp(32px, 6vw, 68px)", textShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
            >
              {dict.title1}<br />{dict.title2}
            </h2>
            <p
              className="font-body text-white/[0.92] leading-[1.55] sm:leading-[1.65] mb-5 sm:mb-8 max-w-[420px]"
              style={{ fontSize: "clamp(14px, 1.8vw, 18px)" }}
            >
              {dict.desc} <strong>{dict.allAges}</strong>
            </p>
            <div className="flex gap-2.5 sm:gap-3 flex-wrap">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="font-body py-3 sm:py-[15px] px-6 sm:px-9 rounded-full border-none bg-white text-coral font-extrabold text-sm sm:text-base cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-400 ease-expo hover:scale-105 no-underline inline-block"
              >
                {dict.cta}
              </a>
              <Link
                href={`/${locale}/actividades/banana-boat`}
                className="font-body py-3 sm:py-[15px] px-5 sm:px-7 rounded-full border-2 border-white/50 bg-transparent text-white font-semibold text-[13px] sm:text-[15px] transition-all duration-300 hover:bg-white/10 no-underline inline-block"
              >
                {dict.price}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
