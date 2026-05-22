import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        casino: "0 20px 80px rgba(0, 0, 0, 0.45)",
        glow: "0 0 28px rgba(245, 183, 66, 0.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
