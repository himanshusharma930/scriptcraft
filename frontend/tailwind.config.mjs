/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        brand: {
          blue: {
            start: '#0066FF',  // Left side of gradient
            mid: '#0088FF',    // Middle of gradient
            end: '#0099FF'     // Right side of gradient
          },
          gray: {
            50: '#F2F2F7',
            100: '#E5E5EA',
            300: '#8E8E93'
          },
          success: '#4CD964'
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
      backgroundImage: {
        'stats-gradient': 'linear-gradient(90deg, #0066FF 0%, #0088FF 50%, #0099FF 100%)',
        'card-hover': 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0))',
        'tab-blur': 'linear-gradient(180deg, rgba(242,242,247,0.9) 0%, rgba(242,242,247,0.95) 100%)',
        'ios-stats-gradient': 'linear-gradient(135deg, #007AFF 0%, #0A84FF 50%, #5856D6 100%)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
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
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        "ios-spring": "ios-spring 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        "sheet-up": "sheet-up 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
};