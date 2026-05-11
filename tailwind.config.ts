import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  // Solo escaneamos lo que de verdad usa Tailwind (admin + lib).
  // La landing pública sigue con styled-jsx, no necesita Tailwind.
  content: [
    "./app/admin/**/*.{ts,tsx}",
    "./components/admin/**/*.{ts,tsx}",
    "./components/ui/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  // El reset de Tailwind se aplica solo a clases tailwind, no toca la landing.
  corePlugins: {
    preflight: false,
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Paleta admin alineada con la identidad Tabaiba (cream/terracota/atlántico)
        cream: {
          DEFAULT: "#faf6ef",
          50: "#fefdfa",
          100: "#faf6ef",
          200: "#f3ecdd",
        },
        sand: {
          DEFAULT: "#e6c878",
          dark: "#c9a754",
        },
        atlantic: {
          DEFAULT: "#3b6e8f",
          dark: "#2a4f68",
        },
        terracotta: {
          DEFAULT: "#c97a52",
        },
        ink: "#1d1d1f",
        "ink-soft": "#6e6e73",
        line: "#d2d2d7",

        // shadcn semantic tokens
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "8px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};

export default config;
