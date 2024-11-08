/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "*.html",
    "./node_modules/flowbite/**/*.js"
  ],

  theme: {
    extend: {
      fontFamily: {
        whisper: ["Whisper", "serif"],
        baskerville: ["Libre-Baskerville", "serif"],
        antic: ["Antic Didone", "serif"]
      },
      colors: {
        "cafe": "#6F4C3E",
        "fondoCrema": "#E3D7BB",
        "fondoVerde": "#2D5132"
      },
      fontSize: {
        'xs': '0.75rem',   // 12px
        'sm': '0.875rem',  // 14px
        'tiny': '0.875rem', // 14px (puedes usarlo como un alias)
        'base': '1rem',    // 16px
        'lg': '1.125rem',  // 18px
        'xl': '1.25rem',   // 20px
        '2xl': '1.5rem',   // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',  // 36px
        '5xl': '3rem',     // 48px
        '6xl': '4rem',     // 64px
        '7xl': '5rem',     // 80px
        '8xl': '6rem',     // 96px
        '9xl': '8rem',
        '10xl': '10rem',   // 160px
        '11xl': '12rem',
      },
      height: {
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '3/4': '75%',
        '9/10': '90%',
        'full': '100%',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

