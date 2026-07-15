import type { LocationKey } from "@/lib/constants";

type LocDict = {
  playa: { label: string };
  puerto: { label: string };
  ambas: { label: string };
};

const STYLES: Record<LocationKey, string> = {
  playa: "bg-turq/15 text-turq border border-turq/25",
  puerto: "bg-gold/15 text-sun border border-gold/30",
  ambas:
    "bg-gradient-to-r from-turq/15 to-gold/15 text-midnight border border-turq/20",
};

const ICONS: Record<LocationKey, string> = {
  playa: "📍",
  puerto: "⚓",
  ambas: "📍⚓",
};

export default function LocationBadge({
  location,
  dict,
  className = "",
}: {
  location: LocationKey;
  dict: LocDict;
  className?: string;
}) {
  const label = dict[location].label;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-[10px] sm:text-[11px] font-bold tracking-wide ${STYLES[location]} ${className}`}
    >
      <span className="leading-none">{ICONS[location]}</span>
      {label}
    </span>
  );
}
