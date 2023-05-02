module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      minHeight: {
        96: '384px',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    themes: [
      {
        javadrip: {
          primary: '#55493b',
          'primary-content': '#FFFFFF',

          secondary: '#ffffff',
          'secondary-content': '#000000',

          accent: '#F8E399',
          'accent-content': '#000000',

          'info-content': '#E4E4E4',
          'base-300': '#372f26',
        },
        uniform: {
          primary: '#0052ED',
          'primary-content': '#FFFFFF',

          secondary: '#ffffff',
          'secondary-content': '#000000',

          accent: '#DF0000',
          'accent-content': '#FFFFFF',

          'info-content': '#99C6FF',
          'base-300': '#001242',
        },
      },
    ],
  },
};
