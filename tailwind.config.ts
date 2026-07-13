import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-soft": "var(--surface-soft)",
        primary: "var(--primary)",
        "primary-soft": "var(--primary-soft)",
        accent: "var(--accent)",
        warning: "var(--warning)",
        main: "var(--text-main)",
        muted: "var(--text-muted)",
        border: "var(--border)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Sora", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["SFMono-Regular", "ui-monospace", "Menlo", "monospace"]
      },
      boxShadow: {
        glow: "0 24px 80px rgba(56, 189, 248, 0.16)",
        panel: "0 16px 60px rgba(0, 0, 0, 0.22)"
      },
      borderRadius: {
        xl: "0.9rem"
      }
    }
  },
  plugins: []
};

export default config;
