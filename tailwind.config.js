module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      width: {
        'screen-xl': '1280px',
      },
      blur: {
        xs: '2px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    themes: [],
  },
};
