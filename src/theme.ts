export type Theme = typeof theme;

export const theme = {
  colors: {
    text: '#FFFFFF',
    background: '#CA052C',
  },
  spacing: {
    padding: {
      xs: '0.25rem',
      s: '0.5rem',
      m: '1rem',
      l: '1.5rem',
      xl: '2rem',
    },
  },
  typography: {
    type: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    weight: {
      regular: '400',
      bold: '600',
      extrabold: '700',
    },
    size: {
      s: '0.9rem',
      m: '1rem',
      l: '1.5rem',
    },
  },
};
