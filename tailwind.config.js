/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      fontFamily: {
        'rubik-mono': ['Rubik Mono One', 'sans-serif'],

      },
      colors: {
        accent: '#B809C3',
        darkviolet: '#5b1778',
         
      },
      backgroundImage: {
        site: "url('./assets/textbox.png')",
    },
    },
  },
  plugins: [],
}

