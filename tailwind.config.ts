import type { Config } from 'tailwindcss';

/**
 * Palette: deep navy and teal primaries, warm neutrals, and high-contrast
 * semantic status colours. Every text/background pairing used in the UI is
 * meant to meet WCAG 2.2 AA (4.5:1 for body text, 3:1 for large text and UI).
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        navy: {
          50: '#eef3f8',
          100: '#d5e1ed',
          200: '#aec5db',
          300: '#7fa2c3',
          400: '#4f7ca6',
          500: '#2f5f8a',
          600: '#1f4a70',
          700: '#183a5a',
          800: '#122c45',
          900: '#0b1f33',
        },
        teal: {
          50: '#ebf7f6',
          100: '#cfeceb',
          200: '#a1d9d6',
          300: '#6cc2be',
          400: '#3aa6a1',
          500: '#17857f',
          600: '#0f6b67',
          700: '#0c5452',
          800: '#0a4240',
          900: '#073130',
        },
        warm: {
          50: '#fbf8f3',
          100: '#f5efe4',
          200: '#ebe0cc',
          300: '#dccbab',
          500: '#8a7451',
          700: '#5c4c32',
          900: '#2e2619',
        },
        status: {
          success: '#1e6b3a',
          warning: '#8a5300',
          danger: '#a3212b',
          info: '#1f4a70',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'Cambria', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11, 31, 51, 0.06), 0 4px 16px rgba(11, 31, 51, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
