/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#eb4034'
      },
      spacing: {
        'vmax': '1000px',
        'vmin': '1000px',
      },
    },
  },
  plugins: [],
}



