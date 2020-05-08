import { css } from '@emotion/core'
import helpers from './helpers'
import { margin } from './util'

export default {
  props: {
    'margin, m': ['space', margin],
    'marginTop, mt': ['space', margin],
    'marginBottom, mb': ['space', margin],
    'marginLeft, ml': ['space', margin],
    'marginRight, mr': ['space', margin],
    'marginX, mx': (vx) => css`
      margin-left: ${vx('space', margin)};
      margin-right: ${vx('space', margin)};
    `,
    'marginY, my': (vx) => css`
      margin-top: ${vx('space', margin)};
      margin-bottom: ${vx('space', margin)};
    `,
    'padding, p': 'space',
    'paddingTop, pt': 'space',
    'paddingBottom, pb': 'space',
    'paddingLeft, pl': 'space',
    'paddingRight, pr': 'space',
    'paddingX, px': (vx) => css`
      padding-left: ${vx('space')};
      padding-right: ${vx('space')};
    `,
    'paddingY, py': (vx) => css`
      padding-top: ${vx('space')};
      padding-bottom: ${vx('space')};
    `,

    // Typography
    fontFamily: 'fonts',
    'letterSpacing, tracking': 'letterSpacings',
    'lineHeight, leading': 'lineHeights',

    // Layout
    width: 'sizes',
    height: 'sizes',
    minWidth: 'sizes',
    minHeight: 'sizes',
    maxWidth: 'sizes',
    maxHeight: 'sizes',
    size: (vx) => css`
      width: ${vx('sizes')};
      height: ${vx('sizes')};
    `,

    // Grid layout
    gridGap: 'space',
    gridRowGap: 'space',
    gridColumnGap: 'space',

    // Background
    'backgroundColor, background, bg': 'colors',
    'backgroundImage, bgImage': null,
    'backgroundPosition, bgPosition': null,
    'backgroundRepeat, bgRepeat': null,
    'backgroundSize, bgSize': null,

    // Border
    borderColor: 'colors',
    borderTop: 'borders',
    borderTopWidth: 'borderWidths',
    borderTopStyle: 'borderStyles',
    borderTopColor: 'colors',
    borderBottom: 'borders',
    borderBottomWidth: 'borderWidths',
    borderBottomStyle: 'borderStyles',
    borderBottomColor: 'colors',
    borderLeft: 'borders',
    borderLeftWidth: 'borderWidths',
    borderLeftStyle: 'borderStyles',
    borderLeftColor: 'colors',
    borderRight: 'borders',
    borderRightWidth: 'borderWidths',
    borderRightStyle: 'borderStyles',
    borderRightColor: 'colors',

    // Border radius
    'borderRadius, rounded': 'radii',
    'borderTopLeftRadius, roundedTopLeft': 'radii',
    'borderTopRightRadius, roundedTopRight': 'radii',
    'borderBottomLeftRadius, roundedBottomLeft': 'radii',
    'borderBottomRightRadius, roundedBottomRight': 'radii',
    'borderTopRadius, roundedTop': (vx) => css`
      border-top-left-radius: ${vx('radii')};
      border-top-right-radius: ${vx('radii')};
    `,
    'borderBottomRadius, roundedBottom': (vx) => css`
      border-bottom-left-radius: ${vx('radii')};
      border-bottom-right-radius: ${vx('radii')};
    `,
    'borderLeftRadius, roundedLeft': (vx) => css`
      border-top-left-radius: ${vx('radii')};
      border-bottom-left-radius: ${vx('radii')};
    `,
    'borderRightRadius, roundedRight': (vx) => css`
      border-top-right-radius: ${vx('radii')};
      border-bottom-right-radius: ${vx('radii')};
    `,

    // Position
    inset: (vx) => css`
      top: ${vx('space')};
      bottom: ${vx('space')};
      left: ${vx('space')};
      right: ${vx('space')};
    `,
    insetX: (vx) => css`
      left: ${vx('space')};
      right: ${vx('space')};
    `,
    insetY: (vx) => css`
      top: ${vx('space')};
      bottom: ${vx('space')};
    `,
    top: 'space',
    bottom: 'space',
    left: 'space',
    right: 'space',
    zIndex: 'zIndices',

    // Shadow
    'boxShadow, shadow': 'shadows',
    textShadow: 'shadows',

    ...helpers,
  },
}
