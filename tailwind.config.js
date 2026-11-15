/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colors extracted directly from The TraveloPedia trademark logo
        logo: {
          lavender: '#BAC4E2', // Large bubble behind 'The Tra'
          periwinkle: '#6376BD', // Deep lavender blue
          periwinkleDark: '#3A4B8C',
          coral: '#F7B8B0', // Soft coral bubble above 've'
          coralDeep: '#E86351', // Vibrant travel coral
          peach: '#FACFA6', // Warm peach bubble above 'di'
          peachGold: '#F39C46', // Golden apricot
          charcoal: '#2D2B2D', // Exact typography color for 'TraveloPedia'
          obsidian: '#171518', // Deep luxury midnight espresso
          slate: '#242226',
        },
        brand: {
          50: '#fdf3f1',
          100: '#fbe4e0',
          200: '#f7c8c0',
          300: '#f19e91',
          400: '#e86e5c',
          500: '#de4a35', // Dynamic Logo Coral
          600: '#ca3622',
          700: '#a92b1a',
          800: '#8c2619',
          900: '#74241a',
        },
        navy: {
          50: '#f3f4f8',
          100: '#e4e7f0',
          200: '#cdd3e3',
          300: '#aab5d1',
          400: '#7f90bb',
          500: '#6376bd', // Logo Periwinkle Blue
          600: '#4c5da3',
          700: '#3d4b83',
          800: '#2b345b',
          900: '#1e243e',
          950: '#141727', // Deep Midnight Blue
        },
        charcoal: {
          800: '#2d2b2d', // Logo Typography
          900: '#201e21',
          950: '#151316',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(23, 21, 24, 0.12), 0 0 1px 1px rgba(23, 21, 24, 0.05)',
        'luxury-hover': '0 25px 50px -12px rgba(222, 74, 53, 0.25), 0 0 1px 1px rgba(222, 74, 53, 0.1)',
        'glow-periwinkle': '0 0 35px -5px rgba(99, 118, 189, 0.35)',
        'glow-coral': '0 0 35px -5px rgba(232, 99, 81, 0.35)',
        'glow-peach': '0 0 35px -5px rgba(250, 207, 166, 0.35)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
      }
    },
  },
  plugins: [],
};
