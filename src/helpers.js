import { css } from '@emotion/core'

export default {
  clearfix: () => css`
    &::after {
      display: block;
      content: '';
      clear: both;
    }
  `,
  textTruncate: () => css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
}
