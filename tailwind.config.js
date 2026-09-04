/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F5FA',
          100: '#E1EBF4',
          200: '#C2D7E9',
          300: '#94BCDB',
          400: '#5C9AC8',
          500: '#327CB4',
          600: '#1D5F94',
          700: '#154A75',
          800: '#0E3454',
          900: '#0B2138',
          950: '#061321',
        },
        corporate: {
          dark: '#0B192C',
          darker: '#060D17',
          surface: '#1E293B',
          border: '#334155',
          light: '#F8FAFC',
          muted: '#64748B',
        },
        brand: {
          blue: '#0052CC',
          'blue-hover': '#0747A6',
          emerald: '#059669',
          'emerald-hover': '#047857',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'elevated': '0 20px 25px -5px rgba(11, 25, 44, 0.1), 0 10px 10px -5px rgba(11, 25, 44, 0.04)',
      }
    },
  },
  plugins: [],
}
