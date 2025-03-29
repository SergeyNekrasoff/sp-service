/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'dark',
  theme: {
    extend: {},
    screens: {
      xss: { min: '0', max: '428px' },
      xs: { min: '429px', max: '767px' },
      s: { min: '768px', max: '1023px' },
      m: '1024px',
      lg: '1320px',
      xl: '1840px',
    },
    colors: {
      transparent: 'transparent',
      white: 'var(--vt-c-white)',
      white_soft: 'var(--vt-c-white-soft)',
      white_mute: 'var(--vt-c-white-mute)',

      black: 'var(--vt-c-black)',
      black_pure: 'var(--vt-c-black-pure)',
      black_soft: 'var(--vt-c-black-soft)',
      black_mute: 'var(--vt-c-black-mute)',
      black_flash: 'var(--vt-c-black-flash)',

      green: 'var(--vt-c-green)',
      green_light: 'var(--vt-c-green-light)',
      green_lighter: 'var(--vt-c-green-lighter)',
      green_dark: 'var(--vt-c-green-dark)',
      green_darker: 'var(--vt-c-green-darker)',

      blue: 'var(--vt-c-blue)',
      blue_light: 'var(--vt-c-blue-light)',
      blue_lighter: 'var(--vt-c-blue-lighter)',
      blue_dark: 'var(--vt-c-blue-dark)',
      blue_darker: 'var(--vt-c-blue-darker)',

      indigo: 'var(--vt-c-indigo)',
      indigo_soft: 'var(--vt-c-indigo-soft)',
      indigo_light: 'var(--vt-c-indigo-light)',

      purple: 'var(--vt-c-purple)',
      purple_light: 'var(--vt-c-purple-light)',
      purple_lighter: 'var(--vt-c-purple-lighter)',
      purple_dark: 'var(--vt-c-purple-dark)',
      purple_darker: 'var(--vt-c-purple-darker)',
    },
  },
  plugins: [],
}
