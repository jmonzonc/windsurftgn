"use client";

import { useState } from "react";
import { useReveal } from "@/lib/hooks";
import WaterParticles from "@/components/ui/WaterParticles";

type ReviewItem = { text: string; name: string; from: string; emoji: string };
type ReviewsDict = {
  title1: string; title2: string; title3: string; rating: string;
  more?: string; less?: string;
  items: ReviewItem[];
};

export default function Reviews({ dict }: { dict: ReviewsDict }) {
  const [ref, vis] = useReveal();
  const moreLabel = dict.more || "Leer m\u00e1s";
  const lessLabel = dict.less || "Ver menos";

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-gradient-to-b from-deep to-midnight py-14 sm:py-20 md:py-28 px-4 sm:px-5 relative overflow-hidden">
      <WaterParticles count={12} />
      <div className="max-w-[1140px] mx-auto relative z-[2] text-center">
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          <h2 className="font-display text-white mb-2" style={{ fontSize: "clamp(26px, 5vw, 50px)" }}>
            {dict.title1} <span className="text-turq">{dict.title2}</span> {dict.title3}
          </h2>
          <p className="font-body text-[13px] sm:text-[15px] text-white/35 mb-8 md:mb-14">{dict.rating}</p>
        </div>
        {/* Mobile: horizontal scroll with snap */}
        <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:hidden">
          {dict.items.map((r, i) => (
            <div key={i} className="snap-center shrink-0 w-[82vw] max-w-[320px]">
              <ReviewCard r={r} vis={vis} delay={0.15 + i * 0.1} moreLabel={moreLabel} lessLabel={lessLabel} />
            </div>
          ))}
        </div>
        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-[18px]">
          {dict.items.map((r, i) => (
            <ReviewCard key={i} r={r} vis={vis} delay={0.15 + i * 0.1} moreLabel={moreLabel} lessLabel={lessLabel} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ r, vis, delay, moreLabel, lessLabel }: {
  r: ReviewItem; vis: boolean; delay: number; moreLabel: string; lessLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = r.text.length > 160;

  return (
    <div
      className="bg-gradient-to-br from-turq/[0.03] to-ocean/[0.03] backdrop-blur-[16px] border border-turq/[0.08] rounded-[20px] sm:rounded-[24px] p-5 text-left flex flex-col h-full"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-[13px]">⭐⭐⭐⭐⭐</span>
        <span className="text-[20px]">{r.emoji}</span>
      </div>
      <div className="flex-1 min-h-0">
        <p
          className={`font-body text-[13px] text-white/[0.72] leading-[1.55] mb-0.5 transition-all duration-300 ${
            !expanded && isLong ? "line-clamp-5" : ""
          }`}
        >
          &ldquo;{r.text}&rdquo;
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="font-body text-[11px] font-semibold text-turq/60 hover:text-turq bg-transparent border-none cursor-pointer p-0 mt-1 mb-1 transition-colors duration-200"
          >
            {expanded ? `\u2212 ${lessLabel}` : `+ ${moreLabel}`}
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 mt-auto pt-3 border-t border-turq/[0.06]">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-turq to-ocean flex items-center justify-center font-body font-extrabold text-white text-[12px] shrink-0">
          {r.name[0].toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="font-body font-bold text-white text-[12px] truncate">{r.name}</div>
          <div className="font-body text-white/30 text-[10px]">{r.from} · ✓ Google</div>
        </div>
      </div>
    </div>
  );
}
