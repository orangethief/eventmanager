/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-2': '#1f2a37',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    darkTheme: "night",
    themes: ["night", "nord"],
  },
  darkMode: ['class', '[data-theme="night"]'],
}
