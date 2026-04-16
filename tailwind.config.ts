import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#071427",
        navy: "#0B1E3A",
        "navy-2": "#132A4A",
        brand: "#1E3A8A",
        glow: "#3B82F6",
        line: "#294163",
        fog: "#9CA3AF",
        snow: "#E5E7EB"
      },
      boxShadow: {
        soft: "0 12px 40px rgba(7, 20, 39, 0.35)",
        glow: "0 0 0 1px rgba(59, 130, 246, 0.18), 0 16px 48px rgba(30, 58, 138, 0.24)"
      },
      backgroundImage: {
        halo: "radial-gradient(circle at top, rgba(59, 130, 246, 0.15), transparent 36%)"
      }
    }
  },
  plugins: []
};

export default config;
