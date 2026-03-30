"use client";

import { useState } from "react";
import Link from "next/link";
import { useReveal } from "@/lib/hooks";
import WaterParticles from "@/components/ui/WaterParticles";
import { ACTIVITY_IMAGES } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

type ActivityItem = { name: string };
type ActividadesDict = {
  pill: string; title1: string; title2: string; discover: string; star: string;
  items: Record<string, ActivityItem>;
};

const KEYS = ["banana-boat", "kayak", "alquiler-windsurf", "alquiler-surf", "paseos-barco", "donut"] as const;
const EMOJIS: Record<string, string> = {
  "banana-boat": "🍌", kayak: "🛶", "alquiler-windsurf": "🏄",
  "alquiler-surf": "🌊", "paseos-barco": "🚤", donut: "🍩",
};
const IMG_MAP: Record<string, string> = {
  "banana-boat": "banana", kayak: "kayak", "alquiler-windsurf": "windsurf_rental",
  "alquiler-surf": "surf_rental", "paseos-barco": "boat_rides", donut: "donut",
};

export default function Actividades({ dict, locale }: { dict: ActividadesDict; locale: Locale }) {
  const [ref, vis] = useReveal();

  return (
    <section id="actividades" ref={ref as React.RefObject<HTMLElement>} className="bg-gradient-to-b from-midnight to-deep py-28 px-5 relative overflow-hidden">
      <WaterParticles count={16} />
      <div className="max-w-[1140px] mx-auto relative z-[2]">
        <div
          className="text-center mb-[60px]"
          style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <div className="section-pill bg-turq/[0.06] border border-turq/[0.12] text-turq mx-auto">{dict.pill}</div>
          <h2 className="font-display text-white leading-[0.95] m-0" style={{ fontSize: "clamp(36px, 6vw, 64px)" }}>
            {dict.title1} <span className="gradient-text-gold">{dict.title2}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {KEYS.map((key, i) => {
            const item = dict.items[key];
            return (
              <ActivityCard
                key={key} slug={key} name={item.name} emoji={EMOJIS[key]}
                img={ACTIVITY_IMAGES[IMG_MAP[key]]} vis={vis} delay={i * 0.08}
                locale={locale} label={dict.discover}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ActivityCard({ slug, name, emoji, img, vis, delay, locale, label }: {
  slug: string; name: string; emoji: string;
  img: string; vis: boolean; delay: number; locale: Locale; label: string;
}) {
  const [h, setH] = useState(false);

  return (
    <Link
      href={`/${locale}/actividades/${slug}`}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="relative rounded-[28px] overflow-hidden cursor-pointer block no-underline transition-all duration-[800ms] ease-expo"
      style={{
        height: 360,
        border: "1px solid rgba(255,255,255,0.06)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(45px)",
        transitionDelay: `${delay}s`,
      }}
    >
      <img
        src={img}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-[800ms] ease-expo"
        style={{ transform: h ? "scale(1.1)" : "scale(1)" }}
      />
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: h
            ? "linear-gradient(to top, rgba(0,20,40,0.85) 0%, rgba(0,20,40,0.3) 50%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,20,40,0.8) 0%, transparent 55%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 p-7 z-[2] transition-transform duration-500 ease-expo"
        style={{ transform: h ? "translateY(-10px)" : "translateY(0)" }}
      >
        <span className="text-4xl">{emoji}</span>
        <h3 className="font-display text-white mt-2 m-0 text-[26px]">{name}</h3>
        <div
          className="font-body text-sm font-semibold text-white/85 mt-2.5 flex items-center gap-1.5 transition-all duration-[350ms] ease-expo"
          style={{ opacity: h ? 1 : 0, transform: h ? "translateY(0)" : "translateY(12px)", transitionDelay: "80ms" }}
        >
          <span>{label}</span>
          <span className="text-lg transition-transform duration-300" style={{ transform: h ? "translateX(4px)" : "none" }}>→</span>
        </div>
      </div>
    </Link>
  );
}
