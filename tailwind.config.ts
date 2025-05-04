/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#1a1a2e',
            light: '#2a2a3e',
          },
          secondary: {
            DEFAULT: '#0f3460',
            light: '#214b77',
          },
          accent: {
            DEFAULT: '#00b4d8',
            hover: '#90e0ef',
          },
          highlight: '#e94560',
          purple: {
            deep: '#4a0e8f',
            light: '#7e57c2',
          },
          teal: {
            deep: '#008080',
            light: '#5eead4',
          },
        },
        fontFamily: {
          sans: ['var(--font-inter)', 'sans-serif'],
          display: ['var(--font-poppins)', 'sans-serif'],
        },
        keyframes: {
          shimmer: {
            '0%': { backgroundPosition: '-500px 0' },
            '100%': { backgroundPosition: '500px 0' },
          },
          typing: {
            from: { width: '0' },
            to: { width: '100%' },
          },
          blink: {
            '50%': { borderColor: 'transparent' },
          },
        },
        animation: {
          shimmer: 'shimmer 2s linear infinite',
          typing: 'typing 3.5s steps(40, end), blink .75s step-end infinite',
        },
      },
    },
    plugins: [],
  }