import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08090C",
        surface: "#101217",
        surfaceHover: "#181B22",
        card: "#12141B",
        border: "#20242E",
        primary: {
          DEFAULT: "#00E599",
          foreground: "#000000",
          glow: "rgba(0, 229, 153, 0.25)",
        },
        accent: {
          DEFAULT: "#38BDF8",
          foreground: "#0B132B",
          glow: "rgba(56, 189, 248, 0.25)",
        },
        muted: {
          DEFAULT: "#8E9AA8",
          foreground: "#5B6574",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "wave-bar": "waveBar 1.2s ease-in-out infinite",
      },
      keyframes: {
        waveBar: {
          "0%, 100%": { height: "4px" },
          "50%": { height: "24px" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
