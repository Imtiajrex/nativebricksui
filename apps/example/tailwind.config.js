const { hairlineWidth } = require('nativewind/theme');
const Colors = require('./src/constants/Colors');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}", "../../packages/core/src/**/*.{js,jsx,ts,tsx}"],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      borderWidth: {
        hairline: hairlineWidth(),
      },
      borderRadius: {
        radius: 'var(--radius)',
        'input': 'var(--input-radius)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({ addBase }) {
      const lightColors = Object.entries(Colors.default.light).reduce((acc, [key, value]) => {

        acc[`--${key}`] = value.replace(/rgb\(([^)]+)\)/g, '$1')
        return acc;
      }, {});
      const darkColors = Object.entries(Colors.default.dark).reduce((acc, [key, value]) => {

        acc[`--${key}`] = value.replace(/rgb\(([^)]+)\)/g, '$1')
        return acc;
      }, {});
      addBase({
        ":root": lightColors,
        ".dark": darkColors
      })
    }, {
      theme: {
        extend: {
          colors: {
            border: 'rgb(var(--border))',
            input: 'rgb(var(--input))',
            ring: 'rgb(var(--ring))',
            background: 'rgb(var(--background))',
            foreground: 'rgb(var(--foreground))',
            primary: {
              DEFAULT: 'rgb(var(--primary))',
              foreground: 'rgb(var(--primary-foreground))',
            },
            secondary: {
              DEFAULT: 'rgb(var(--secondary))',
              foreground: 'rgb(var(--secondary-foreground))',
            },
            success: {
              DEFAULT: 'rgb(var(--success))',
              foreground: 'rgb(var(--success-foreground))',
            },
            destructive: {
              DEFAULT: 'rgb(var(--destructive))',
              foreground: 'rgb(var(--destructive-foreground))',
            },
            muted: {
              DEFAULT: 'rgb(var(--muted))',
              foreground: 'rgb(var(--muted-foreground))',
            },
            accent: {
              DEFAULT: 'rgb(var(--accent))',
              foreground: 'rgb(var(--accent-foreground))',
            },
            popover: {
              DEFAULT: 'rgb(var(--popover))',
              foreground: 'rgb(var(--popover-foreground))',
            },
            card: {
              DEFAULT: 'rgb(var(--card))',
              foreground: 'rgb(var(--card-foreground))',
            },
          }
        }
      }
    })
  ],
};