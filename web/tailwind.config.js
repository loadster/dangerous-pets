/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom retro color palette
      colors: {
        'retro-bronze': '#ad7d2d',
        'retro-gold': '#ffd700',
        'retro-green': '#2d7d2d',
        'retro-red-dark': '#8b0000',
        'retro-red': '#ff0000',
      },

      // Custom font family
      fontFamily: {
        'retro': ['VT', 'serif'],
      },

      // Custom font sizes matching the retro aesthetic
      fontSize: {
        'retro-base': '24px',
        'retro-h1': '48px',
        'retro-h2': '24px',
        'retro-h3': '32px',
        'retro-large': '32px',
        'retro-xlarge': '28px',
        // Responsive overrides
        'retro-base-tablet': '24px',
        'retro-h1-tablet': '40px',
        'retro-base-mobile': '24px',
        'retro-h1-mobile': '32px',
        'retro-base-mobile-sm': '24px',
        'retro-h1-mobile-sm': '28px',
        'retro-h3-mobile': '24px',
        'retro-xlarge-mobile': '24px',
        'retro-gold-mobile': '28px',
        'retro-gold-mobile-sm': '24px',
        'retro-button-large': '28px',
        'retro-button-mobile': '24px',
        'retro-button-mobile-sm': '24px',
        'retro-toast-mobile-sm': '24px',
      },

      // Custom spacing for retro layout
      spacing: {
        '128': '128px',
      },

      // Custom breakpoints (mobile-first approach)
      screens: {
        'sm': '480px',    // Mobile small breakpoint
        'md': '768px',    // Mobile large breakpoint
        'lg': '1024px',   // Tablet breakpoint
        'xl': '1401px',   // Desktop breakpoint
      },

      // Custom animations
      keyframes: {
        slideIn: {
          'from': {
            opacity: '0',
            transform: 'translateX(-50%) translateY(-20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(-50%) translateY(0)',
          },
        },
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
      },

      // Custom borders
      borderWidth: {
        DEFAULT: '2px',
        '0': '0',
        '2': '2px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    // Disable features that conflict with retro aesthetic
    borderRadius: false,
    boxShadow: false,
  },
}
