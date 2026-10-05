import type { Config } from 'tailwindcss';

/**
 * Om Agrosphere visual language.
 *
 * `field`  — deep agricultural green, used for authority / primary surfaces.
 * `grain`  — wheat-amber accent, used sparingly for emphasis and CTAs.
 * `soil`   — warm brown, used for secondary text and earthy dividers.
 * `paper`  — warm off-white page background (avoids a sterile pure-white look).
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FBF8F2',
          dim: '#F4EFE5',
          deep: '#EBE3D4',
        },
        ink: {
          DEFAULT: '#15120E',
          soft: '#3A342C',
          muted: '#6B6358',
        },
        field: {
          50: '#F1F6F1',
          100: '#DEEADF',
          200: '#BCD5BF',
          300: '#8EB795',
          400: '#5D9268',
          500: '#3C7349',
          600: '#2B5A37',
          700: '#22472C',
          800: '#1B3824',
          900: '#162D1E',
          950: '#0D1B12',
        },
        grain: {
          50: '#FDF8EC',
          100: '#FAEECF',
          200: '#F4DA9B',
          300: '#EBC264',
          400: '#E0A93B',
          500: '#C98A1B',
          600: '#A86E14',
          700: '#855314',
          800: '#6E4316',
          900: '#5C3815',
        },
        soil: {
          100: '#EFE6DC',
          300: '#C8AE95',
          500: '#8A6A4F',
          700: '#5A4433',
          900: '#35281E',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'var(--font-devanagari)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'var(--font-devanagari)', 'system-ui', 'sans-serif'],
        devanagari: ['var(--font-devanagari)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '72rem',
        prose: '38rem',
      },
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(21, 18, 14, 0.04), 0 8px 24px -16px rgba(21, 18, 14, 0.18)',
        lift: '0 2px 4px rgba(21, 18, 14, 0.06), 0 18px 40px -22px rgba(21, 18, 14, 0.28)',
      },
      backgroundImage: {
        // Subtle woven/chaff texture used behind dark panels. Cheap, no image request.
        weave:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='0.055' stroke-width='1'%3E%3Cpath d='M0 14h28M14 0v28'/%3E%3Cpath d='M0 0l28 28M28 0L0 28' stroke-opacity='0.03'/%3E%3C/g%3E%3C/svg%3E\")",
        // Light grain-fleck texture for placeholder surfaces.
        chaff:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%235A4433' fill-opacity='0.085'%3E%3Ccircle cx='6' cy='8' r='1.5'/%3E%3Ccircle cx='24' cy='4' r='1'/%3E%3Ccircle cx='34' cy='15' r='1.5'/%3E%3Ccircle cx='14' cy='22' r='1'/%3E%3Ccircle cx='30' cy='31' r='1.5'/%3E%3Ccircle cx='4' cy='34' r='1'/%3E%3Ccircle cx='19' cy='37' r='1.5'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
