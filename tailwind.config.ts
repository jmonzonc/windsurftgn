import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: "#0068D6",
        deep: "#002B5C",
        midnight: "#001428",
        abyss: "#000B18",
        turq: "#00D4AA",
        aqua: "#00E5FF",
        cyan: "#7DF9FF",
        foam: "#EAF6FF",
        ice: "#F4FAFF",
        sand: "#FFF8EF",
        sun: "#FF8C38",
        coral: "#FF4466",
        gold: "#FFCF40",
      },
      fontFamily: {
        display: ["var(--font-dela)", "cursive"],
        body: ["var(--font-outfit)", "sans-serif"],
      },
      animation: {
        "hero-shimmer": "heroShimmer 5s ease-in-out infinite",
        "scroll-down": "scrollDown 2.2s ease-in-out infinite",
        "wave-1": "wave1 7s ease-in-out infinite",
        "wave-2": "wave2 9s ease-in-out infinite",
        "float-0": "float0 6s ease-in-out infinite",
        "float-1": "float1 8s ease-in-out infinite",
        "float-2": "float2 7s ease-in-out infinite",
        "float-3": "float3 9s ease-in-out infinite",
        "card-reveal": "cardReveal 0.55s cubic-bezier(0.16,1,0.3,1) forwards",
        "img-zoom": "imgZoom 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
      },
      keyframes: {
        heroShimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        scrollDown: {
          "0%": { transform: "translateY(-120%)", opacity: "0" },
          "30%": { opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "translateY(120%)", opacity: "0" },
        },
        cardReveal: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        imgZoom: {
          from: { transform: "scale(1.08)", opacity: "0.7" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        float0: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(20px, -30px)" },
        },
        float1: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-25px, 20px)" },
        },
        float2: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(15px, 25px)" },
        },
        float3: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-18px, -22px)" },
        },
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
