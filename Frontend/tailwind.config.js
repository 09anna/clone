/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
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
        border: "oklch(var(--color-border) / <alpha-value>)",
        background: "oklch(var(--color-background) / <alpha-value>)",
        foreground: "oklch(var(--color-foreground) / <alpha-value>)",
        card: "oklch(var(--color-card) / <alpha-value>)",
        'card-foreground': "oklch(var(--color-card-foreground) / <alpha-value>)",
        primary: "oklch(var(--color-primary) / <alpha-value>)",
        'primary-foreground': "oklch(var(--color-primary-foreground) / <alpha-value>)",
        secondary: "oklch(var(--color-secondary) / <alpha-value>)",
        'secondary-foreground': "oklch(var(--color-secondary-foreground) / <alpha-value>)",
        muted: "oklch(var(--color-muted) / <alpha-value>)",
        'muted-foreground': "oklch(var(--color-muted-foreground) / <alpha-value>)",
        accent: "oklch(var(--color-accent) / <alpha-value>)",
        'accent-foreground': "oklch(var(--color-accent-foreground) / <alpha-value>)",
        destructive: "oklch(var(--color-destructive) / <alpha-value>)",
        ring: "oklch(var(--color-ring) / <alpha-value>)",
        input: "oklch(var(--color-input) / <alpha-value>)",
        // Add more if needed
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
  plugins: [require("tailwindcss-animate")],
}
