/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',       // usually your React code is under src
    './components/**/*.{js,jsx,ts,tsx}', // if your components folder is outside src
    './pages/**/*.{js,jsx,ts,tsx}',      // if you have a pages folder for routing
    './app/**/*.{js,jsx,ts,tsx}',        // if you have app folder (Next.js style)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
