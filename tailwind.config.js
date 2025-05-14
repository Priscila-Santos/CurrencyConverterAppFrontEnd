/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // habilita o dark mode por classe
  theme: {
    extend: {
      colors: {
        // Definindo cores personalizadas
        primary: "#1E3A8A",
        secondary: "#9333EA",
        backgroundLight: "#F3F4F6",
        backgroundDark: "#111827",
        textLight: "#111827",
        textDark: "#1F2937",
      },  
    },
  },
  plugins: [],
};
