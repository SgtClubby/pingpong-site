module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-dark": "#34455d"
      },
      boxShadow: {
        'bottom': '0px 10px 6px rgba(0, 0, 0, 0.2)',
      },
      keyframes: {
        "rotate-forwards-180": {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        "rotate-backwards-180": {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(-180deg)' },
        },
        "slide-in": {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(-200px)' },
        },
        "slide-out": {
          '0%': { transform: 'translateX(-200px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        "rotate-forwards-180": 'rotate-forwards-180 0.9s forwards',
        "rotate-backwards-180": 'rotate-backwards-180 0.9s forwards',
        "slide-in": 'slide-in 0.6s forwards',
        "slide-out": 'slide-out 0.6s forwards',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
