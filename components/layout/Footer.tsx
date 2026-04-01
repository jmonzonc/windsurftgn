"use client";

import Link from "next/link";
import { SITE } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import WaterParticles from "@/components/ui/WaterParticles";

type FooterDict = {
  tagline: string;
  copy: string;
  privacy: string;
  legal: string;
};

export default function Footer({ dict, locale }: { dict: FooterDict; locale: Locale }) {
  return (
    <footer className="relative overflow-hidden bg-abyss border-t border-turq/[0.08] pt-8 sm:pt-12 pb-6 sm:pb-9 px-4 sm:px-5 text-center">
      <WaterParticles count={6} />
      <div className="relative z-[2]">
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 mb-2 sm:mb-3">
          <span className="text-[22px] sm:text-[28px]">🌊</span>
          <span className="font-display text-base sm:text-xl text-white">WINDSURF <span className="text-turq">TARRAGONA</span></span>
        </div>
        <p className="font-body text-xs sm:text-sm text-white/30 mb-4 sm:mb-5">{dict.tagline}</p>
        <div className="flex gap-3 sm:gap-4 justify-center mb-4 sm:mb-6">
          <a href={SITE.instagram} target="_blank" rel="noreferrer" className="font-body text-[12px] sm:text-[13px] font-medium text-white/40 no-underline hover:text-turq transition-colors duration-300">Instagram</a>
          <a href={SITE.facebook} target="_blank" rel="noreferrer" className="font-body text-[12px] sm:text-[13px] font-medium text-white/40 no-underline hover:text-turq transition-colors duration-300">Facebook</a>
          <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="font-body text-[12px] sm:text-[13px] font-medium text-white/40 no-underline hover:text-turq transition-colors duration-300">Google Maps</a>
        </div>
        <div className="flex gap-4 justify-center mb-4 sm:mb-6">
          <Link href={`/${locale}/privacidad`} className="font-body text-[11px] sm:text-xs text-white/20 no-underline hover:text-white/40 transition-colors">{dict.privacy}</Link>
        </div>
        <div className="border-t border-white/[0.06] pt-4 sm:pt-5">
          <p className="font-body text-[11px] sm:text-xs text-white/20">{dict.copy}</p>
        </div>
      </div>
    </footer>
  );
}
