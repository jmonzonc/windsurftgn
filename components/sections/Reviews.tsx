"use client";

import { useReveal } from "@/lib/hooks";
import WaterParticles from "@/components/ui/WaterParticles";

type ReviewItem = { text: string; name: string; from: string; emoji: string };
type ReviewsDict = { title1: string; title2: string; title3: string; rating: string; items: ReviewItem[] };

export default function Reviews({ dict }: { dict: ReviewsDict }) {
  const [ref, vis] = useReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-gradient-to-b from-deep to-midnight py-28 px-5 relative overflow-hidden">
      <WaterParticles count={12} />
      <div className="max-w-[1140px] mx-auto relative z-[2] text-center">
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          <h2 className="font-display text-white mb-2" style={{ fontSize: "clamp(30px, 5vw, 50px)" }}>
            {dict.title1} <span className="text-turq">{dict.title2}</span> {dict.title3}
          </h2>
          <p className="font-body text-[15px] text-white/35 mb-14">{dict.rating}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
          {dict.items.map((r, i) => (
            <div key={i} className="bg-gradient-to-br from-turq/[0.03] to-ocean/[0.03] backdrop-blur-[16px] border border-turq/[0.08] rounded-[28px] p-8 text-left"
              style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.1}s` }}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-base">⭐⭐⭐⭐⭐</span>
                <span className="text-[28px]">{r.emoji}</span>
              </div>
              <p className="font-body text-[15px] text-white/[0.78] leading-[1.6] mb-5">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-turq to-ocean flex items-center justify-center font-body font-extrabold text-white text-[15px]">{r.name[0]}</div>
                <div>
                  <div className="font-body font-bold text-white text-sm">{r.name}</div>
                  <div className="font-body text-white/30 text-xs">{r.from} · ✓ Google</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
