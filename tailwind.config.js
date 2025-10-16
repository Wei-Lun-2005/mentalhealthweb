/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neo-pink': '#FF005C',
        'neo-cyan': '#00F0FF',
        'neo-yellow': '#FFD600',
        'neo-green': '#00FF85',
        'neo-purple': '#B800FF',
      },
      fontFamily: {
        'mono': ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
