"use client";

import { useState, useEffect } from "react";

const ANIM_CLASSES = [
  "animate-float-0",
  "animate-float-1",
  "animate-float-2",
  "animate-float-3",
];

const COLORS = ["bg-aqua", "bg-turq", "bg-cyan"];

type Particle = {
  x: number;
  y: number;
  size: number;
  delay: number;
  opacity: number;
};

export default function WaterParticles({ count = 20 }: { count?: number }) {
  // Se generan en el cliente tras el montaje para evitar hydration mismatch
  // (Math.random produce valores distintos en servidor y cliente).
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      [...Array(count)].map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 5,
        delay: Math.random() * 8,
        opacity: 0.05 + Math.random() * 0.15,
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${COLORS[i % 3]} ${ANIM_CLASSES[i % 4]}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
