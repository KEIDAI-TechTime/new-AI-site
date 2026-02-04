import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF8C42',
        accent: '#2EC4B6',
        cream: '#FFF8F0',
      },
      fontFamily: {
        rounded: ['"M PLUS Rounded 1c"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
