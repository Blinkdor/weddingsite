/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        midnight: "var(--color-midnight)",
        ash: "var(--color-ash)",
        bone: "var(--color-bone)",
        accent: "var(--color-accent)",
        overlay: "var(--color-overlay)",
      },
      fontFamily: {
        display: ['var(--font-display)', '"Playfair Display"', 'serif'],
        body: ['var(--font-body)', '"Libre Baskerville"', 'serif'],
      },
      boxShadow: {
        panel: '0 0 40px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
}
