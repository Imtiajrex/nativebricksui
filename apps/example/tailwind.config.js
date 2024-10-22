/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "../../packages/ui/src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        divider: 'rgba(0,0,0,0.12)',
        background: '#f9f9f9',
        card: '#ffffff',
        primary: '#65a5f0',
        "primary-foreground": '#f9f9f9',
        'light-primary': '#abcdf5',
        "light-primary-foreground": '#1e7be8',
        secondary: '#f81ce5',
        "secondary-foreground": '#ffffff',
        'accent': '#f81ce5',
        'accent-foreground': '#ffffff',
        warning: '#f5a623',
        "warning-foreground": '#ffffff',
        success: '#2ecc71',
        "success-foreground": '#ffffff',
        error: '#ff3860',
        "error-foreground": '#ffffff',
        destructive: '#ff3860',
        "destructive-foreground": '#ffffff',
        border: '#eaeaea',
        shadow: 'rgba(0, 0, 0, 0.05)',
      },
      dropShadow: {
        'card': '0px 4px 6px rgba(0, 0, 0, 0.05)',
        'button': '0px 2px 4px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        radius: '0.65rem',
      },
      maxWidth: {
        'container-size': '1280px',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};

