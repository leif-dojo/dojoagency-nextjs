/** @type {import('tailwindcss').Config} */

const generateFontSizesAndSpacing = (sizes = []) => {
  const fs = {}
  sizes.forEach(i => {
    fs[i] = `${i}rem`
  })
  return fs
}

const generateFontSizesAndSpacingEm = (sizes = []) => {
  const fs = {}
  sizes.forEach(i => {
    fs[`${i}rem`] = `${i}rem`
  })
  return fs
}

const range = (start, end, step) => {
  return Array.from(
    Array.from(Array(Math.ceil((end - start) / step)).keys()),
    x => start + x * step
  )
}

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      smd: '768px',
      md: '1024px',
      lg: '1280px',
      xl: '1440px',
      xxl: '1700px',
      xxxl: '1920px',
      'max-xs': { max: '399px' },
      'max-sm': { max: '639px' },
      'max-smd': { max: '767px' },
      'max-md': { max: '1023px' },
      'max-lg': { max: '1279px' },
    },
    container: {
      center: 'true',
      padding: {
        DEFAULT: '20rem',
        md: '50rem',
        lg: '100rem',
      },
    },
    fontFamily: {
      helvetica: ['Helvetica', 'Arial', 'sans-serif'],
      myriad: ['Myriad Pro', 'Myriad', 'Arial', 'sans-serif'],
      lato: ['var(--font-lato)'],
      nothingyoucoulddo: ['var(--font-nothingyoucoulddo)'],
    },
    minHeight: {
      '5em': '5em',
    },
    fontWeight: {
      '100': '100',
      '200': '200',
      '300': '300',
      '400': '400',
      '500': '500',
      '600': '600',
      '700': '700',
      '800': '800',
      '900': '900'
    },
    fontSize: {
      ...generateFontSizesAndSpacing([
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        18,
        20,
        22,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        32,
        34,
        36,
        38,
        40,
        43,
        45,
        46,
        48,
        50,
        52,
        54,
        55,
        60,
        65,
        70,
        80,
        90,
        100,
        110,
        113
      ]),
    },
    letterSpacing: {
      ...generateFontSizesAndSpacing([
        0.12,
        0.2,
      ]),
      ...generateFontSizesAndSpacingEm([
        -0.03,
        -0.04,
      ]),
    },
    spacing: {
      ...generateFontSizesAndSpacing([
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        200,
        280,
        ...range(0, 200, 5),
      ]),
    },
    colors: {
      white: '#fff',
      dark: '#423E3A',
      navy: '#000040',
      slate: '#304a5f',
      blue: '#00aeef',
      bluelight: '#00aeef',
      darkgrey: '#231f20',
      orange: '#fa642d',
      black: '#000000',
      aqua: '#00ba9c',
      green: '#00ba9c',
      gold: '#f2ac25',
      brand: {
        orange: '#fa642d',
        blue: '#8db7d7',
        light: '#fbf9f7',
        lightblue: '#97afc1',
        accent: '#5f81b0',
      },
    },
    maxWidth: {
      '7em': '7em',
      '32em': '32em',
      '85%': '85%',
    },
    extend: {
      lineHeight: {
        ...generateFontSizesAndSpacing([
          6,
          7,
          10,
          12,
          14,
          20,
          22,
          24,
          28,
          30,
          32,
          34,
          36,
          38,
          40,
          43,
          48,
          56,
          60,
          80,
          100,
          120,
        ]),
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
