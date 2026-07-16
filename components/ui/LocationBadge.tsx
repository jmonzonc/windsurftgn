import type { LocationKey } from "@/lib/constants";

type LocDict = {
  playa: { label: string };
  puerto: { label: string };
  ambas: { label: string };
};

// Variante por defecto (sobre fondos claros/UI)
const STYLES: Record<LocationKey, string> = {
  playa: "bg-turq/15 text-turq border border-turq/25",
  puerto: "bg-gold/15 text-sun border border-gold/30",
  ambas: "bg-gradient-to-r from-turq/15 to-gold/15 text-midnight border border-turq/20",
};

// Variante sobre imagen (fondo opaco para legibilidad)
const STYLES_ON_IMAGE: Record<LocationKey, string> = {
  playa: "bg-turq/90 text-white border border-white/20",
  puerto: "bg-sun/90 text-white border border-white/20",
  ambas: "bg-gradient-to-r from-turq/90 to-sun/90 text-white border border-white/20",
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
  onImage = false,
}: {
  location: LocationKey;
  dict: LocDict;
  className?: string;
  onImage?: boolean;
}) {
  const label = dict[location].label;
  const styles = onImage ? STYLES_ON_IMAGE[location] : STYLES[location];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-[10px] sm:text-[11px] font-bold tracking-wide ${styles} ${className}`}
    >
      <span className="leading-none shrink-0">{ICONS[location]}</span>
      <span className="truncate">{label}</span>
    </span>
  );
}
