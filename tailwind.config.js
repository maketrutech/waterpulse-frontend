/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Palette WaterPulse : bleu profond + accent cyan
      colors: {
        ink: '#062A3A',
        mist: '#E6F4F8',
        sky: {
          deep: '#063D56',
          mid: '#0E7490',
          soft: '#14B8A6',
        },
        aqua: {
          DEFAULT: '#38BDF8',
          glow: '#7DD3FC',
          soft: '#E0F2FE',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"Figtree"', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 18px 40px -24px rgba(6, 61, 86, 0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        'bar-grow': {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.55s ease-out both',
        'pulse-soft': 'pulse-soft 1.6s ease-in-out infinite',
        'bar-grow': 'bar-grow 0.7s ease-out both',
      },
    },
  },
  plugins: [],
};
