export default function Wave({
  color = "#EAF6FF",
  flip = false,
}: {
  color?: string;
  flip?: boolean;
}) {
  return (
    <div
      className="relative z-[3] pointer-events-none leading-[0]"
      style={{
        marginTop: flip ? 0 : -2,
        marginBottom: flip ? -2 : 0,
        transform: flip ? "scaleY(-1)" : "none",
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height: "clamp(24px, 4vw, 60px)" }}
      >
        <path fill={color} opacity="0.5">
          <animate
            attributeName="d"
            dur="7s"
            repeatCount="indefinite"
            values="M0,40 C240,80 480,0 720,40 S1200,80 1440,40 L1440,80 L0,80Z;M0,50 C240,10 480,70 720,30 S1200,0 1440,50 L1440,80 L0,80Z;M0,30 C240,70 480,10 720,50 S1200,70 1440,30 L1440,80 L0,80Z;M0,40 C240,80 480,0 720,40 S1200,80 1440,40 L1440,80 L0,80Z"
          />
        </path>
        <path fill={color}>
          <animate
            attributeName="d"
            dur="9s"
            repeatCount="indefinite"
            values="M0,50 C360,80 720,20 1080,50 S1380,70 1440,50 L1440,80 L0,80Z;M0,35 C360,10 720,60 1080,30 S1380,20 1440,45 L1440,80 L0,80Z;M0,55 C360,70 720,25 1080,55 S1380,40 1440,35 L1440,80 L0,80Z;M0,50 C360,80 720,20 1080,50 S1380,70 1440,50 L1440,80 L0,80Z"
          />
        </path>
      </svg>
    </div>
  );
}
