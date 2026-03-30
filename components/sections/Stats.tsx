"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/lib/hooks";
import WaterParticles from "@/components/ui/WaterParticles";

type StatsDict = {
  years: string; yearsLabel: string;
  people: string; peopleLabel: string;
  activities: string; activitiesLabel: string;
  days: string; daysLabel: string;
};

const ICONS = ["⚓", "😄", "🏄", "☀️"];

function useCounter(target: number, duration: number, active: boolean): number {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target, duration]);

  return count;
}

function AnimatedStat({
  raw, label, icon, vis, delay,
}: {
  raw: string; label: string; icon: string; vis: boolean; delay: number;
}) {
  const match = raw.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
  const prefix = match?.[1] ?? "";
  const num = parseInt(match?.[2] ?? "0", 10);
  const suffix = match?.[3] ?? "";
  const count = useCounter(num, 1800, vis);

  return (
    <div
      className="py-14 px-6 text-center md:border-r md:last:border-r-0 border-turq/[0.08] border-b last:border-b-0 md:border-b-0"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(35px)",
        transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      <div className="text-[34px] mb-2.5">{icon}</div>
      <div className="font-display text-white leading-none" style={{ fontSize: "clamp(36px, 5vw, 54px)" }}>
        {prefix}{count}{suffix}
      </div>
      <div className="font-body text-xs font-semibold text-turq mt-2.5 tracking-[2px] uppercase">{label}</div>
    </div>
  );
}

export default function Stats({ dict }: { dict: StatsDict }) {
  const [ref, vis] = useReveal(0.25);
  const stats = [
    { raw: dict.years, label: dict.yearsLabel },
    { raw: dict.people, label: dict.peopleLabel },
    { raw: dict.activities, label: dict.activitiesLabel },
    { raw: dict.days, label: dict.daysLabel },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-gradient-to-br from-ocean to-deep relative overflow-hidden">
      <WaterParticles count={10} />
      <div className="grid grid-cols-2 md:grid-cols-4 max-w-[1100px] mx-auto relative z-[2]">
        {stats.map((s, i) => (
          <AnimatedStat key={i} raw={s.raw} label={s.label} icon={ICONS[i]} vis={vis} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
