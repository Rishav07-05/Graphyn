import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "Segoe UI", "sans-serif"],
        body: ["Manrope", "Segoe UI", "sans-serif"]
      },
      colors: {
        graphyn: {
          ink: "#0b0f1a",
          slate: "#111827",
          mist: "#e7eefb",
          cyan: "#4af0e5",
          emerald: "#35f1a4",
          ember: "#f97316"
        }
      },
      boxShadow: {
        glass: "0 18px 50px rgba(15, 23, 42, 0.18)",
        outline: "0 0 0 2px rgba(74, 240, 229, 0.4)"
      }
    }
  },
  plugins: []
} satisfies Config;
