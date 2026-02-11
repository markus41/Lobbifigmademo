/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#D4AF37',
          light: '#F4D03F',
          pale: '#F5E6A3',
          dark: '#8B7330'
        },
        neutral: {
        "50": "#FAFAF9",
        "100": "#F5F5F4",
        "200": "#E7E5E4",
        "400": "#A8A29E",
        "600": "#57534E",
        "800": "#292524",
        "900": "#1C1917"
},
        success: '#059669',
        warning: '#D97706',
        error: '#DC2626',
        info: '#0284C7'
      },
      spacing: {
        "0": "0",
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "7": "28px",
        "8": "32px",
        "9": "36px",
        "10": "40px",
        "12": "48px",
        "14": "56px",
        "16": "64px",
        "20": "80px",
        "24": "96px",
        "px": "1px",
        "0.5": "2px",
        "1.5": "6px",
        "2.5": "10px",
        "3.5": "14px",
        "container": "max(1.5rem, 4vw)",
        "sectionY": "8rem",
        "cardPadding": "20px",
        "inputPadding": "16px"
},
      borderRadius: {
        "none": "0",
        "xs": "4px",
        "sm": "8px",
        "md": "12px",
        "lg": "16px",
        "xl": "20px",
        "2xl": "24px",
        "3xl": "32px",
        "full": "9999px",
        "panel": "24px",
        "input": "12px",
        "button": "10px",
        "card": "16px"
},
      boxShadow: {
        "none": "none",
        "xs": "0 1px 2px rgba(0,0,0,0.03)",
        "sm": "0 2px 4px rgba(0,0,0,0.04)",
        "md": "0 4px 12px rgba(0,0,0,0.06)",
        "lg": "0 8px 24px rgba(0,0,0,0.08)",
        "xl": "0 16px 40px rgba(0,0,0,0.10)",
        "2xl": "0 24px 60px rgba(0,0,0,0.12)",
        "panel": "0 8px 32px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.02)",
        "float": "0 12px 40px rgba(0,0,0,0.08)",
        "goldSoft": "0 12px 40px rgba(212,175,55,0.14)",
        "goldGlow": "0 0 40px -10px rgba(212,175,55,0.3)",
        "inner": "inset 0 2px 4px rgba(0,0,0,0.06)",
        "focus": "0 0 0 3px rgba(212,175,55,0.25)"
},
      fontFamily: {
        display: ['DM Serif Display', 'Playfair Display', 'Georgia', 'serif'],
        body: ['Sora', 'DM Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
        accent: ['Cormorant Garamond', 'Georgia', 'serif']
      },
      fontSize: {
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
        "7xl": "4.5rem"
},
      transitionDuration: {
        "instant": "0",
        "fast": "150",
        "normal": "300",
        "slow": "500",
        "heroIntro": "2000",
        "gateToAuth": "900",
        "focus": "350",
        "hover": "450",
        "pageTransition": "800",
        "ambientCycle": "12000"
}
    }
  }
};

export default config;
