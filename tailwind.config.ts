import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundColor: {
        bg_gray: 'radial-gradient(77.25% 77.25% at 69.89% 22.75%, rgba(255, 255, 255, 0.7) 0%, rgba(191, 191, 191, 0.7) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
