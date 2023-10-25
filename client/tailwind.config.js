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
      fontFamily: {
        "robo":"Roboto",
        "gill":['Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', 'sans-serif']
      }
    },
  },
  plugins: [],
}



