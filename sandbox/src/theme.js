const space = [
  0,
  '.25rem',
  '.5rem',
  '.75rem',
  '1rem',
  '1.25rem',
  '1.5rem',
  '2rem',
  '2.5rem',
  '3rem',
  '4rem',
  '5rem',
  '6rem',
  '8rem',
  '10rem',
  '12rem',
  '14rem',
  '16rem',
]

export default {
  breakpoints: ['640px', '768px', '1024px', '1280px'],
  space,
  fontSizes: [
    '.75rem',
    '.875rem',
    '1rem',
    '1.125rem',
    '1.25rem',
    '1.5rem',
    '1.875rem',
    '2.25rem',
    '3rem',
    '4rem',
  ],
  colors: {
    primary: 'magenta',
    dark: 'hsl(0, 0%, 10%)',
    magenta: {
      600: 'hsl(300, 100%, 42.5%)',
    },
  },
  fonts: {
    sans:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  sizes: {
    ...space,
    '1/12': '8.333333%',
    '1/6': '16.666667%',
    '1/5': '20%',
    '1/4': '25%',
    '1/3': '33.333333%',
    '2/5': '40%',
    '5/12': '41.666667%',
    '1/2': '50%',
    '7/12': '58.333333%',
    '3/5': '60%',
    '2/3': '66.666667%',
    '3/4': '75%',
    '4/5': '80%',
    '5/6': '83.333333%',
    '11/12': '91.666667%',
  },
  orders: {
    first: -9999,
    last: 9999,
  },
}
