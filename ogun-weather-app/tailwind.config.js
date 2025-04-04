/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      colors: {
        'weather-yellow': '#FFD700',
        'weather-orange': '#FFA500',
        'weather-blue': '#00BFFF',
        'weather-purple': '#9370DB',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
