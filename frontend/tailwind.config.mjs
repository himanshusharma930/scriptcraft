/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        brand: {
          blue: {
            start: '#0066FF',
            mid: '#0088FF',
            end: '#0099FF',
            dark: '#0A84FF'
          },
          dark: {
            bg: '#000000',
            card: '#1C1C1E',
            secondary: '#2C2C2E',
            border: '#38383A',
            text: {
              primary: '#FFFFFF',
              secondary: '#98989D'
            }
          },
          light: {
            bg: '#F2F2F7',
            card: '#FFFFFF',
            border: '#E5E5EA',
            text: {
              primary: '#000000',
              secondary: '#8E8E93'
            }
          },
          gray: {
            100: '#E5E5EA',
            300: '#8E8E93',
            dark: '#98989D'
          },
          success: {
            light: '#34C759',
            dark: '#30D158'
          }
        },
        ios: {
          blue: {
            start: '#007AFF',
            mid: '#0A84FF',
            end: '#5856D6'
          },
          gray: {
            start: '#8E8E93',
            end: '#636366'
          }
        }
      },
      borderColor: {
        DEFAULT: "hsl(var(--border))"
      },
      backgroundImage: {
        'stats-gradient': 'linear-gradient(90deg, #0066FF 0%, #0088FF 50%, #0099FF 100%)',
        'stats-gradient-dark': 'linear-gradient(90deg, #0055DD 0%, #0077DD 50%, #0088DD 100%)',
        'card-hover': 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0))',
        'tab-blur': 'linear-gradient(180deg, rgba(242,242,247,0.9) 0%, rgba(242,242,247,0.95) 100%)',
        'ios-stats-gradient': 'linear-gradient(135deg, #007AFF 0%, #0A84FF 50%, #5856D6 100%)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'ios': '10px',
        'ios-xl': '20px',
      },
      boxShadow: {
        'ios': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'ios-md': '0 4px 12px rgba(0, 0, 0, 0.06)',
        'ios-lg': '0 8px 24px rgba(0, 0, 0, 0.08)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        "ios-spring": {
          "0%": { transform: "scale(0.96)" },
          "40%": { transform: "scale(1.02)" },
          "70%": { transform: "scale(0.98)" },
          "100%": { transform: "scale(1)" },
        },
        "sheet-up": {
          "0%": { 
            transform: "translateY(100%)",
            opacity: 0.5
          },
          "100%": { 
            transform: "translateY(0)",
            opacity: 1
          }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(20px)" },
          "100%": { transform: "translateY(0)" }
        },
        "pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        "ios-spring": "ios-spring 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        "sheet-up": "sheet-up 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
        'slide-up': 'slide-up 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in-from-bottom 0.3s ease-out",
        "pulse": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
};