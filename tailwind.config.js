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
        // Sphere OS Dark Theme
        sphere: {
          bg: '#0A0D14',
          surface: '#0F1219',
          card: '#141820',
          sidebar: '#070A10',
          border: 'rgba(255, 255, 255, 0.06)',
        },
        // Colors from The TraveloPedia trademark logo (keep existing)
        logo: {
          lavender: '#BAC4E2',
          periwinkle: '#6376BD',
          periwinkleDark: '#3A4B8C',
          coral: '#F7B8B0',
          coralDeep: '#E86351',
          peach: '#FACFA6',
          peachGold: '#F39C46',
          charcoal: '#2D2B2D',
          obsidian: '#171518',
          slate: '#242226',
        },
        brand: {
          50: '#fdf3f1',
          100: '#fbe4e0',
          200: '#f7c8c0',
          300: '#f19e91',
          400: '#e86e5c',
          500: '#de4a35',
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
          500: '#6376bd',
          600: '#4c5da3',
          700: '#3d4b83',
          800: '#2b345b',
          900: '#1e243e',
          950: '#141727',
        },
        charcoal: {
          800: '#2d2b2d',
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
        'glow-purple': '0 0 40px -8px rgba(168, 85, 247, 0.25)',
        'glow-cyan': '0 0 40px -8px rgba(6, 182, 212, 0.25)',
        'glow-emerald': '0 0 40px -8px rgba(16, 185, 129, 0.25)',
        'glow-orange': '0 0 40px -8px rgba(249, 115, 22, 0.25)',
        'glow-rose': '0 0 40px -8px rgba(244, 63, 94, 0.25)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'glass-hover': '0 16px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      },
      backdropBlur: {
        '2xl': '40px',
        '3xl': '64px',
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
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
