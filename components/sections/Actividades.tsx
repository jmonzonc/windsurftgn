"use client";

import { useState } from "react";
import Link from "next/link";
import { useReveal } from "@/lib/hooks";
import WaterParticles from "@/components/ui/WaterParticles";
import LocationBadge from "@/components/ui/LocationBadge";
import { ACTIVITY_IMAGES, ACTIVITY_LOCATION, type LocationKey } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

type ActivityItem = { name: string; price?: string; capacity?: string };
type LocDict = {
  playa: { label: string };
  puerto: { label: string };
  ambas: { label: string };
};
type ActividadesDict = {
  pill: string; title1: string; title2: string; discover: string; star: string;
  items: Record<string, ActivityItem>;
};

const KEYS = ["banana-boat", "kayak", "alquiler-windsurf", "alquiler-surf", "paseos-barco", "big-paddle-surf"] as const;
const EMOJIS: Record<string, string> = {
  "banana-boat": "🍌", kayak: "🛶", "alquiler-windsurf": "🏄",
  "alquiler-surf": "🌊", "paseos-barco": "🚤", "big-paddle-surf": "🛟",
};
const IMG_MAP: Record<string, string> = {
  "banana-boat": "banana", kayak: "kayak", "alquiler-windsurf": "windsurf_rental",
  "alquiler-surf": "surf_rental", "paseos-barco": "boat_rides", "big-paddle-surf": "big_paddle_surf",
};

export default function Actividades({ dict, locDict, locale }: { dict: ActividadesDict; locDict: LocDict; locale: Locale }) {
  const [ref, vis] = useReveal();

  return (
    <section id="actividades" ref={ref as React.RefObject<HTMLElement>} className="bg-gradient-to-b from-midnight to-deep py-14 sm:py-20 md:py-28 px-4 sm:px-5 relative overflow-hidden">
      <WaterParticles count={16} />
      <div className="max-w-[1140px] mx-auto relative z-[2]">
        <div
          className="text-center mb-8 sm:mb-12 md:mb-[60px]"
          style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <div className="section-pill bg-turq/[0.06] border border-turq/[0.12] text-turq mx-auto text-[10px] sm:text-xs">{dict.pill}</div>
          <h2 className="font-display text-white leading-[0.95] m-0" style={{ fontSize: "clamp(30px, 6vw, 64px)" }}>
            {dict.title1} <span className="gradient-text-gold">{dict.title2}</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-[18px]">
          {KEYS.map((key, i) => {
            const item = dict.items[key];
            return (
              <ActivityCard
                key={key} slug={key} name={item.name} emoji={EMOJIS[key]}
                price={item.price} capacity={item.capacity}
                img={ACTIVITY_IMAGES[IMG_MAP[key]]} vis={vis} delay={i * 0.07}
                locale={locale} label={dict.discover}
                location={ACTIVITY_LOCATION[key] ?? "playa"} locDict={locDict}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ActivityCard({ slug, name, emoji, price, capacity, img, vis, delay, locale, label, location, locDict }: {
  slug: string; name: string; emoji: string;
  price?: string; capacity?: string;
  img: string; vis: boolean; delay: number; locale: Locale; label: string;
  location: LocationKey; locDict: LocDict;
}) {
  const [h, setH] = useState(false);

  return (
    <Link
      href={`/${locale}/actividades/${slug}`}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="relative rounded-[18px] sm:rounded-[24px] md:rounded-[28px] overflow-hidden cursor-pointer block no-underline transition-all duration-[800ms] ease-expo"
      style={{
        aspectRatio: "3 / 4",
        border: "1px solid rgba(255,255,255,0.06)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(45px)",
        transitionDelay: `${delay}s`,
      }}
    >
      <img
        src={img}
        alt={`${name} · ${locDict[location === "ambas" ? "playa" : location].label}, Tarragona`}
        width={600} height={800}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-expo"
        style={{ transform: h ? "scale(1.1)" : "scale(1)" }}
      />
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: h
            ? "linear-gradient(to top, rgba(0,18,36,0.92) 0%, rgba(0,18,36,0.45) 45%, rgba(0,18,36,0.15) 100%)"
            : "linear-gradient(to top, rgba(0,18,36,0.9) 0%, rgba(0,18,36,0.3) 45%, rgba(0,18,36,0.1) 100%)",
        }}
      />
      {/* Fila superior: ubicación (izq) + precio (der), sin solaparse */}
      <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-3.5 sm:left-3.5 sm:right-3.5 z-[3] flex items-start justify-between gap-2">
        <LocationBadge location={location} dict={locDict} onImage className="backdrop-blur-md shadow-lg min-w-0 max-w-[62%]" />
        {price && price !== "Consultar" && price !== "Ask for prices" && (
          <span className="shrink-0 bg-turq/95 backdrop-blur-md text-white py-1 px-2.5 sm:px-3.5 rounded-full font-body font-bold text-[10px] sm:text-xs shadow-lg whitespace-nowrap">
            {price.split("·")[0].trim()}
          </span>
        )}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-5 md:p-7 z-[2] transition-transform duration-500 ease-expo"
        style={{ transform: h ? "translateY(-10px)" : "translateY(0)" }}
      >
        <span className="text-2xl sm:text-3xl md:text-4xl drop-shadow-lg">{emoji}</span>
        <h3
          className="font-display text-white mt-1 sm:mt-2 m-0 text-[17px] sm:text-[22px] md:text-[26px] leading-tight"
          style={{ textShadow: "0 2px 12px rgba(0,10,25,0.7)" }}
        >
          {name}
        </h3>
        {capacity && (
          <p
            className="font-body text-[10px] sm:text-xs text-white/75 mt-0.5"
            style={{ textShadow: "0 1px 8px rgba(0,10,25,0.7)" }}
          >
            {capacity}
          </p>
        )}
        <div
          className="font-body text-xs sm:text-sm font-semibold text-white mt-1.5 sm:mt-2.5 flex items-center gap-1.5 transition-all duration-[350ms] ease-expo"
          style={{ opacity: h ? 1 : 0, transform: h ? "translateY(0)" : "translateY(12px)", transitionDelay: "80ms", textShadow: "0 1px 8px rgba(0,10,25,0.7)" }}
        >
          <span>{label}</span>
          <span className="text-base sm:text-lg transition-transform duration-300" style={{ transform: h ? "translateX(4px)" : "none" }}>→</span>
        </div>
      </div>
    </Link>
  );
}
