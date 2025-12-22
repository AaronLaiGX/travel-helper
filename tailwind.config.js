/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Tokyo Zen" Palette
        primary: {
          DEFAULT: '#1a1a1a', // Soft Black for text
          50: '#f9f9f9',
          100: '#f0f0f0',
          900: '#1a1a1a',
        },
        accent: {
          DEFAULT: '#e11d48', // Refined Red (Pantone-like)
          light: '#fff1f2', // Soft pink background
        },
        surface: {
          DEFAULT: '#ffffff',
          alt: '#fdfdfd',
        },
        divider: '#f0f0f0',
      },
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans JP"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'], // Added for editorial feel
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'float': '0 20px 40px -4px rgba(0, 0, 0, 0.08)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
