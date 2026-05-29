/**
 * Tailwind config for the PartsSource React + TS Kit.
 * Mirrors the inline config currently in `index.html`.
 *
 * Build the static CSS with:
 *   npx tailwindcss -c tailwind.config.js -i tailwind-input.css -o tailwind.css --minify
 *
 * Then drop `tailwind.css` into this folder and the standalone HTML
 * will pick it up via <link rel="stylesheet" href="tailwind.css">.
 */
module.exports = {
  // Scan every .tsx in this folder AND src/ so JIT picks up arbitrary values
  // like bg-[#005BA6], h-[760px], shadow-[0_0_10px_5px_rgba(0,91,166,0.5)], etc.
  content: ['./*.tsx', './*.html', './src/**/*.{ts,tsx}'],

  theme: {
    extend: {
      colors: {
        'ps-blue': {
          50:  '#EFF9FE',
          100: '#D0EDFC',
          200: '#B0C6D3',
          400: '#009CF4',
          500: '#005BA6',
          600: '#004A84',
          700: '#003763',
          800: '#002F48',
        },
        'ps-gray': {
          50:  '#FAFAFA',
          100: '#F5F5F5',
          150: '#F1F1F1',
          200: '#E6E6E6',
          300: '#DCDCDC',
          400: '#CCCCCC',
          500: '#949494',
          600: '#777777',
          700: '#4A4A4A',
          800: '#2B2B2B',
        },
        'ps-orange': {
          400: '#FF9505',
          500: '#EC8000',
          600: '#D27200',
        },
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'Source Sans 3', 'system-ui', 'sans-serif'],
      },
    },
  },

  plugins: [],
};
