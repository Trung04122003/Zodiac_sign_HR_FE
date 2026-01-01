/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Sagittarius Primary Theme ♐
        sagittarius: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#9B59B6', // Main Sagittarius Purple
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        // Secondary Blue
        optimism: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3498DB', // Optimism Blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Zodiac Elements
        fire: {
          DEFAULT: '#E74C3C',
          light: '#EC7063',
          dark: '#C0392B',
        },
        earth: {
          DEFAULT: '#27AE60',
          light: '#52BE80',
          dark: '#1E8449',
        },
        air: {
          DEFAULT: '#3498DB',
          light: '#5DADE2',
          dark: '#2874A6',
        },
        water: {
          DEFAULT: '#9B59B6',
          light: '#AF7AC5',
          dark: '#76448A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'zodiac': '0 4px 20px rgba(155, 89, 182, 0.15)',
        'fire': '0 4px 20px rgba(231, 76, 60, 0.2)',
        'earth': '0 4px 20px rgba(39, 174, 96, 0.2)',
        'air': '0 4px 20px rgba(52, 152, 219, 0.2)',
        'water': '0 4px 20px rgba(155, 89, 182, 0.2)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}