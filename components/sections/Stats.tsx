"use client";

import { useReveal } from "@/lib/hooks";
import WaterParticles from "@/components/ui/WaterParticles";

type StatsDict = {
  years: string; yearsLabel: string;
  people: string; peopleLabel: string;
  activities: string; activitiesLabel: string;
  days: string; daysLabel: string;
};

const ICONS = ["⚓", "😄", "🏄", "☀️"];

export default function Stats({ dict }: { dict: StatsDict }) {
  const [ref, vis] = useReveal(0.25);
  const stats = [
    { number: dict.years, label: dict.yearsLabel },
    { number: dict.people, label: dict.peopleLabel },
    { number: dict.activities, label: dict.activitiesLabel },
    { number: dict.days, label: dict.daysLabel },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-gradient-to-br from-ocean to-deep relative overflow-hidden">
      <WaterParticles count={10} />
      <div className="grid grid-cols-2 md:grid-cols-4 max-w-[1100px] mx-auto relative z-[2]">
        {stats.map((s, i) => (
          <div key={i} className="py-14 px-6 text-center md:border-r md:last:border-r-0 border-turq/[0.08] border-b last:border-b-0 md:border-b-0"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(35px)", transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s` }}>
            <div className="text-[34px] mb-2.5">{ICONS[i]}</div>
            <div className="font-display text-white leading-none" style={{ fontSize: "clamp(36px, 5vw, 54px)" }}>{s.number}</div>
            <div className="font-body text-xs font-semibold text-turq mt-2.5 tracking-[2px] uppercase">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
