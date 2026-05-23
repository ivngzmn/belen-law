/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    fontFamily: {
      display: ['"Libre Baskerville"', 'Georgia', 'serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
    },
    extend: {
      colors: {
        evergreen: {
          DEFAULT: '#123C35',
          soft: '#1a4f47',
        },
        ivory: {
          DEFAULT: '#F8F3EA',
          alt: '#efe8d8',
        },
        charcoal: {
          DEFAULT: '#222222',
          soft: '#5b5e5a',
        },
        gold: {
          DEFAULT: '#C8A45D',
          soft: '#d8ba7c',
        },
        terracotta: '#B7654A',
        'liberty-blue': '#3D5A73',
        'heritage-red': '#9E4A3F',
        line: {
          DEFAULT: '#ddd1bd',
          soft: '#e9dfca',
        },
      },
      maxWidth: {
        site: '1200px',
      },
      borderRadius: {
        card: '18px',
        lg: '28px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
};
