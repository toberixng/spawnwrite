// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#121C27', // headers, nav, footers
        accent: '#b8c103', // CTAs, links, pricing
        blue: '#4285F4', // secondary buttons, alerts
        neutral: '#FAFAFA', // cards, modals, posts
        input: '#f5f5f5', // forms, inputs
        textDark: '#1A1A1A', // body text
        textMuted: '#6B7280', // placeholders, captions
      },
    },
  },
  plugins: [],
};

export default config;