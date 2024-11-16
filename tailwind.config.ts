import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-content": "var(--primary-content)",
        secondary: "var(--secondary)",
        "secondary-content": "var(--secondary-content)",
        accent: "var(--accent)",
        "accent-content": "var(--accent-content)",
        neutral: "var(--neutral)",
        "neutral-content": "var(--neutral-content)",
        "base-100": "var(--base-100)",
        "base-200": "var(--base-200)",
        "base-300": "var(--base-300)",
        "base-content": "var(--base-content)",
      },
    },
  },
  plugins: [],
} satisfies Config;
