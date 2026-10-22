/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        deep: "#0a0c17",
        "deep-700": "#0f111e",
        slateink: "#15182b",
        paper: "#f8f9fa",
        lemon: "#fde126",
        gold: "#f5d020",
        wash: "#1a1e2e",
        ink: {
          DEFAULT: "#f8f9fa",
          soft: "#e9ecef",
          faint: "#adb5bd",
          mute: "#9098a8",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: [
          '"IBM Plex Sans Condensed"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 25px 50px -12px rgba(0,0,0,.25)",
        soft: "0 1px 2px rgba(0,0,0,.05)",
        lift: "0 18px 40px -22px rgba(40,36,45,.55)",
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
        "rise-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pip-pop": {
          "0%": { opacity: "0", transform: "scale(.4) rotate(-20deg)" },
          "70%": { transform: "scale(1.25) rotate(6deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "rise-in": "rise-in .6s cubic-bezier(.2,.7,.3,1) both",
        "pip-pop": "pip-pop .5s cubic-bezier(.2,.9,.3,1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
