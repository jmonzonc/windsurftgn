"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useScroll } from "@/lib/hooks";
import WaterParticles from "@/components/ui/WaterParticles";
import type { Locale } from "@/lib/i18n";

type HeroDict = {
  location: string; pre: string; title1: string; title2: string;
  sub1: string; sub2: string; sub3: string;
  cta1: string; cta2: string; cta3: string; scroll: string;
};

export default function Hero({ dict, locale }: { dict: HeroDict; locale: Locale }) {
  const scrollY = useScroll();
  const [loaded, setLoaded] = useState(false);
  const [vidLoaded, setVidLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(t);
  }, []);

  const tr = (delay: string) => `all 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}`;

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-abyss">
      <video
        autoPlay muted loop playsInline
        onCanPlay={() => setVidLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover brightness-[0.38] saturate-[1.3] contrast-[1.1] transition-opacity duration-[1500ms]"
        style={{ transform: `translateY(${scrollY * 0.25}px) scale(1.15)`, opacity: vidLoaded ? 1 : 0 }}
      >
        <source src="https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-cover bg-center brightness-[0.35] saturate-[1.3] transition-opacity duration-[1500ms]"
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&w=1920")`,
          opacity: vidLoaded ? 0 : 1,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 25% 75%, rgba(0,212,170,0.13) 0%, transparent 55%),
            radial-gradient(ellipse at 75% 25%, rgba(0,104,214,0.2) 0%, transparent 55%),
            linear-gradient(to top, #000B18 0%, rgba(0,11,24,0.53) 8%, transparent 35%),
            linear-gradient(to bottom, rgba(0,11,24,0.4) 0%, transparent 20%)`,
        }}
      />
      <WaterParticles count={24} />

      <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center">
        <div
          className="inline-flex items-center gap-2 bg-turq/[0.07] backdrop-blur-[20px] border border-turq/[0.16] rounded-full px-6 py-2.5"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(25px)", transition: tr("0.2s") }}
        >
          <span className="text-base">📍</span>
          <span className="font-body text-xs font-semibold text-turq tracking-[3px] uppercase">{dict.location}</span>
        </div>

        <div
          className="font-body font-light text-white/45 tracking-[6px] uppercase mt-7 mb-3"
          style={{ fontSize: "clamp(13px, 1.8vw, 17px)", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: tr("0.35s") }}
        >
          {dict.pre}
        </div>

        <h1
          className="font-display text-white leading-[0.88] mb-2 max-w-[950px]"
          style={{ fontSize: "clamp(48px, 10vw, 130px)", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(50px)", transition: `all 1s cubic-bezier(0.16,1,0.3,1) 0.5s` }}
        >
          <span className="block">{dict.title1}</span>
          <span className="inline-block gradient-text-turq animate-hero-shimmer">{dict.title2}</span>
        </h1>

        <p
          className="font-body text-white/60 leading-[1.7] max-w-[520px] mt-4 mb-10"
          style={{ fontSize: "clamp(15px, 2vw, 19px)", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(35px)", transition: `all 1s cubic-bezier(0.16,1,0.3,1) 0.7s` }}
        >
          {dict.sub1}<br />
          <strong className="text-white/85">{dict.sub2}</strong><br />
          <span className="text-turq font-semibold">{dict.sub3}</span>
        </p>

        <div
          className="flex gap-3.5 flex-wrap justify-center"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: `all 1s cubic-bezier(0.16,1,0.3,1) 0.9s` }}
        >
          <Link href={`/${locale}/actividades/banana-boat`} className="btn-primary py-[15px] px-[34px] text-[15px] no-underline">
            {dict.cta1}
          </Link>
          <Link href={`/${locale}#escuela`} className="btn-ghost py-[15px] px-[34px] text-[15px] no-underline">
            {dict.cta2}
          </Link>
          <Link href={`/${locale}#actividades`} className="btn-ghost py-[15px] px-[34px] text-[15px] no-underline">
            {dict.cta3}
          </Link>
        </div>

        <div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
          style={{ bottom: "clamp(80px, 12vh, 130px)", opacity: loaded ? 0.5 : 0, transition: "opacity 2s ease 2s" }}
        >
          <span className="font-body text-[11px] text-white tracking-[3px] uppercase">{dict.scroll}</span>
          <div className="w-px h-11 relative overflow-hidden">
            <div className="w-full h-1/2 bg-gradient-to-b from-turq to-transparent rounded-sm animate-scroll-down" />
          </div>
        </div>
      </div>

      <div className="absolute -bottom-0.5 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="w-full block" style={{ height: "clamp(40px, 7vw, 90px)" }}>
          <path fill="#F4FAFF" opacity="0.4">
            <animate attributeName="d" dur="6s" repeatCount="indefinite"
              values="M0,45 Q360,90 720,45 T1440,45 L1440,90 L0,90Z;M0,55 Q360,15 720,55 T1440,35 L1440,90 L0,90Z;M0,35 Q360,75 720,35 T1440,55 L1440,90 L0,90Z;M0,45 Q360,90 720,45 T1440,45 L1440,90 L0,90Z" />
          </path>
          <path fill="#F4FAFF">
            <animate attributeName="d" dur="8s" repeatCount="indefinite"
              values="M0,55 Q480,90 960,55 T1440,60 L1440,90 L0,90Z;M0,40 Q480,20 960,50 T1440,35 L1440,90 L0,90Z;M0,60 Q480,75 960,40 T1440,55 L1440,90 L0,90Z;M0,55 Q480,90 960,55 T1440,60 L1440,90 L0,90Z" />
          </path>
        </svg>
      </div>
    </section>
  );
}
