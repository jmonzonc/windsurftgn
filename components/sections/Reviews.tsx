"use client";

import { useState } from "react";
import { useReveal } from "@/lib/hooks";
import WaterParticles from "@/components/ui/WaterParticles";

type ReviewItem = { text: string; name: string; from: string; emoji: string };
type ReviewsDict = {
  title1: string; title2: string; title3: string; rating: string;
  more: string; less: string;
  items: ReviewItem[];
};

const MAX_CHARS = 160;

function ReviewCard({ r, vis, delay, moreLabel, lessLabel }: {
  r: ReviewItem; vis: boolean; delay: number; moreLabel: string; lessLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = r.text.length > MAX_CHARS;
  const displayText = isLong && !expanded
    ? r.text.slice(0, MAX_CHARS).trimEnd() + "..."
    : r.text;

  return (
    <div
      className="bg-gradient-to-br from-turq/[0.03] to-ocean/[0.03] backdrop-blur-[16px] border border-turq/[0.08] rounded-[20px] sm:rounded-[28px] p-5 sm:p-6 md:p-8 text-left flex flex-col"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <span className="text-sm sm:text-base">&#11088;&#11088;&#11088;&#11088;&#11088;</span>
        <span className="text-[22px] sm:text-[28px]">{r.emoji}</span>
      </div>
      <p className="font-body text-[13px] sm:text-[15px] text-white/[0.78] leading-[1.5] sm:leading-[1.6] mb-1 flex-1">
        &ldquo;{displayText}&rdquo;
      </p>
      {isLong ? (
        <button
          onClick={() => setExpanded(!expanded)}
          className="font-body text-[12px] sm:text-[13px] font-semibold text-turq bg-transparent border-none cursor-pointer text-left p-0 mb-4 sm:mb-5 hover:text-aqua transition-colors"
        >
          {expanded ? lessLabel : moreLabel}
        </button>
      ) : (
        <div className="mb-4 sm:mb-5" />
      )}
      <div className="flex items-center gap-2.5 sm:gap-3 mt-auto">
        <div className="w-8 h-8 sm:w-[38px] sm:h-[38px] rounded-full bg-gradient-to-br from-turq to-ocean flex items-center justify-center font-body font-extrabold text-white text-[13px] sm:text-[15px] shrink-0">
          {r.name[0]}
        </div>
        <div>
          <div className="font-body font-bold text-white text-[13px] sm:text-sm">{r.name}</div>
          <div className="font-body text-white/30 text-[11px] sm:text-xs">{r.from} &middot; &#10003; Google</div>
        </div>
      </div>
    </div>
  );
}

export default function Reviews({ dict }: { dict: ReviewsDict }) {
  const [ref, vis] = useReveal();

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-[18px]">
          {dict.items.map((r, i) => (
            <ReviewCard
              key={i}
              r={r}
              vis={vis}
              delay={0.15 + i * 0.1}
              moreLabel={dict.more}
              lessLabel={dict.less}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
