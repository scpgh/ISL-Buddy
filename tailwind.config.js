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
        duoGreen: {
          DEFAULT: '#58cc02',
          dark: '#46a302',
          light: '#89e219',
        },
        duoBlue: {
          DEFAULT: '#1cb0f6',
          dark: '#1899d6',
        },
        duoYellow: {
          DEFAULT: '#ffc800',
          dark: '#e5b200',
        },
        duoRed: {
          DEFAULT: '#ff4b4b',
          dark: '#ea2b2b',
        },
        duoPurple: {
          DEFAULT: '#ce82ff',
          dark: '#a559d6',
        },
        duoDark: {
          bg: '#131f24',
          card: '#18252b',
          border: '#37464f',
          muted: '#52656d',
          text: '#ffffff',
        },
        duoLight: {
          bg: '#ffffff',
          card: '#ffffff',
          border: '#e5e5e5',
          muted: '#afafaf',
          text: '#4b4b4b',
        }
      },
      borderRadius: {
        'default': '12px',
        'md': '16px',
        'lg': '20px',
        'full': '9999px',
      },
      fontFamily: {
        sans: ["Feather", "'Din Next Rounded'", "'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      animation: {
        'pop-in': 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'shake': 'shake 0.4s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s infinite',
        'bounce-short': 'bounceShort 0.3s ease 1',
      },
      keyframes: {
        popIn: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-8px)' },
          '40%, 80%': { transform: 'translateX(8px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(88, 204, 2, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(88, 204, 2, 0.8)' },
        },
        bounceShort: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      }
    },
  },
  plugins: [],
}
