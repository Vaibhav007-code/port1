/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'backdrop-blur-sm',
    'backdrop-blur-md',
    'backdrop-blur-lg',
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: '#faf8ff',
          100: '#f4f0ff',
          200: '#ece4ff',
          300: '#ddd0ff',
          400: '#c9b3ff',
          500: '#b088ff',
        },
        pastelPink: {
          50: '#fff5f7',
          100: '#ffe8ee',
          200: '#ffd6e0',
          300: '#ffb8cc',
          400: '#ff9ab8',
          500: '#ff7ca3',
        },
        cream: {
          50: '#fffef9',
          100: '#fffcf0',
          200: '#fff8e1',
          300: '#fff3d0',
          400: '#ffedb8',
          500: '#ffe7a0',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'pastel-gradient': 'linear-gradient(135deg, #faf8ff 0%, #fff5f7 50%, #fffef9 100%)',
      },
      boxShadow: {
        'pink-glow': '0 0 20px rgba(255, 124, 163, 0.3)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}