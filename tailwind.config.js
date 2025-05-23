/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Cinzel', 'serif'],
        'sans': ['Raleway', 'sans-serif'],
      },
      colors: {
        parchment: {
          50: '#FFFDF0',
          100: '#FFF8D6',
          200: '#FFF3B8',
          300: '#FFEE9A',
          400: '#FFE97C',
          500: '#F5D76E',
          600: '#E6C963',
          700: '#D6B957',
          800: '#C7A94C',
          900: '#B89A40',
        },
        terracotta: {
          50: '#FFF5F2',
          100: '#FFE6E0',
          200: '#FFCCBF',
          300: '#FFB39F',
          400: '#FF997F',
          500: '#F87E5F',
          600: '#E56B4F',
          700: '#D25940',
          800: '#C04730',
          900: '#AF3520',
        },
        gold: {
          50: '#FFFDF5',
          100: '#FFF8D6',
          200: '#FFF3B8',
          300: '#FFEE9A',
          400: '#FFE97C',
          500: '#FFD700',
          600: '#EBC900',
          700: '#D7BB00',
          800: '#C3AD00',
          900: '#AF9F00',
        },
        stone: {
          50: '#F7F7F7',
          100: '#E3E3E3',
          200: '#C8C8C8',
          300: '#A4A4A4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#171717',
        },
      },
      backgroundImage: {
        'parchment-texture': "url('https://images.pexels.com/photos/7294537/pexels-photo-7294537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        'stone-texture': "url('https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      },
    },
  },
  plugins: [],
};