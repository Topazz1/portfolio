/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arknights: {
          bg: '#0d0f12',       // Noir mat / Gris très sombre
          surface: '#14181d',  // Couleur des modules / cartes
          border: '#262c35',   // Lignes fines
          accent: '#ffb300',   // Jaune ambré Arknights (ou choisis ta couleur)
          textMuted: '#7a889b' // Texte secondaire clinique
        }
      },
      fontFamily: {
        // Utilise une police sans-serif très géométrique/moderne
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'reverse-spin': 'spin 12s linear infinite reverse',
      },
    },
  },
  plugins: [],
}