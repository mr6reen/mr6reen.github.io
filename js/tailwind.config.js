/**
 * Shared Tailwind CSS configuration.
 * Must be loaded AFTER cdn.tailwindcss.com script tag.
 */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        orange: { DEFAULT: '#F55E1E', bg: '#FEF0EA', dim: '#FCDCCE' },
        green:  { DEFAULT: '#27AE60', bg: '#E8F5EE' },
      },
      fontFamily: {
        anton:  ['Anton', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    }
  }
};
