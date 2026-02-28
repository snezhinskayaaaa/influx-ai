import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'influx-blue': '#0066FF',
        'deep-purple': '#6B46C1',
        'electric-cyan': '#00E5FF',
        'neutral-gray': '#1A1A1A',
        'success-green': '#00D084',
        'warning-orange': '#FF6B35',
      },
    },
  },
  plugins: [],
};

export default config;
