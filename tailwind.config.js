/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './src/**/*.{js,ts,jsx,tsx}',
      './styles/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        animation: {
          marquee: 'marquee 25s linear infinite',
        },
        keyframes: {
          marquee: {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(-100%)' },
          },
        },
      },
    },
    plugins: [],
  };