import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0a0b0d",
          elev: "#121317",
          card: "#16181d",
          hover: "#1c1e24",
        },
        line: {
          DEFAULT: "#262830",
          strong: "#2f323b",
        },
        ink: {
          DEFAULT: "#e8e9ec",
          muted: "#9095a1",
          dim: "#666b75",
        },
        accent: {
          gold: "#d4a24a",
          goldDim: "#8c6a2f",
        },
        tone: {
          tech: "#6aa9ff",
          semi: "#f0a04b",
          health: "#4dd0b4",
          defense: "#a5b4fc",
          risk: "#d4a24a",
          danger: "#e15a5a",
          good: "#5cb88a",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "IBM Plex Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      letterSpacing: {
        widerx: "0.14em",
      },
      boxShadow: {
        soft: "0 1px 0 0 rgba(255,255,255,0.02) inset, 0 0 0 1px rgba(255,255,255,0.02)",
      },
    },
  },
  plugins: [],
};

export default config;
