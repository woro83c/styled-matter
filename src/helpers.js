export default {
  clearfix: {
    '&::after': { clear: 'both', content: `''`, display: 'block' },
  },
  textTruncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}
