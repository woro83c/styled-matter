import helpers from './helpers'
import { getBorder, getSpace } from './util'

export default {
  props: {
    'margin, m': ['space', getSpace],
    'marginTop, mt': ['space', getSpace],
    'marginBottom, mb': ['space', getSpace],
    'marginLeft, ml': ['space', getSpace],
    'marginRight, mr': ['space', getSpace],
    'marginX, mx': (vx) => ({
      marginLeft: vx('space', getSpace),
      marginRight: vx('space', getSpace),
    }),
    'marginY, my': (vx) => ({
      marginTop: vx('space', getSpace),
      marginBottom: vx('space', getSpace),
    }),
    'padding, p': ['space', getSpace],
    'paddingTop, pt': ['space', getSpace],
    'paddingBottom, pb': ['space', getSpace],
    'paddingLeft, pl': ['space', getSpace],
    'paddingRight, pr': ['space', getSpace],
    'paddingX, px': (vx) => ({
      paddingLeft: vx('space', getSpace),
      paddingRight: vx('space', getSpace),
    }),
    'paddingY, py': (vx) => ({
      paddingTop: vx('space', getSpace),
      paddingBottom: vx('space', getSpace),
    }),

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
    size: (vx) => ({
      width: vx('sizes'),
      height: vx('sizes'),
    }),

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
    border: ['borders', getBorder],
    borderColor: 'colors',
    borderTop: ['borders', getBorder],
    borderTopWidth: 'borderWidths',
    borderTopStyle: 'borderStyles',
    borderTopColor: 'colors',
    borderBottom: ['borders', getBorder],
    borderBottomWidth: 'borderWidths',
    borderBottomStyle: 'borderStyles',
    borderBottomColor: 'colors',
    borderLeft: ['borders', getBorder],
    borderLeftWidth: 'borderWidths',
    borderLeftStyle: 'borderStyles',
    borderLeftColor: 'colors',
    borderRight: ['borders', getBorder],
    borderRightWidth: 'borderWidths',
    borderRightStyle: 'borderStyles',
    borderRightColor: 'colors',

    // Border radius
    'borderRadius, rounded': 'radii',
    'borderTopLeftRadius, roundedTopLeft': 'radii',
    'borderTopRightRadius, roundedTopRight': 'radii',
    'borderBottomLeftRadius, roundedBottomLeft': 'radii',
    'borderBottomRightRadius, roundedBottomRight': 'radii',
    'borderTopRadius, roundedTop': (vx) => ({
      borderTopLeftRadius: vx('radii'),
      borderTopRightRadius: vx('radii'),
    }),
    'borderBottomRadius, roundedBottom': (vx) => ({
      borderBottomLeftRadius: vx('radii'),
      borderBottomRightRadius: vx('radii'),
    }),
    'borderLeftRadius, roundedLeft': (vx) => ({
      borderTopLeftRadius: vx('radii'),
      borderBottomLeftRadius: vx('radii'),
    }),
    'borderRightRadius, roundedRight': (vx) => ({
      borderTopRightRadius: vx('radii'),
      borderBottomRightRadius: vx('radii'),
    }),

    // Position
    inset: (vx) => ({
      top: vx('space', getSpace),
      bottom: vx('space', getSpace),
      left: vx('space', getSpace),
      right: vx('space', getSpace),
    }),
    insetX: (vx) => ({
      left: vx('space', getSpace),
      right: vx('space', getSpace),
    }),
    insetY: (vx) => ({
      top: vx('space', getSpace),
      bottom: vx('space', getSpace),
    }),
    top: ['space', getSpace],
    bottom: ['space', getSpace],
    left: ['space', getSpace],
    right: ['space', getSpace],
    zIndex: 'zIndices',

    // Shadow
    'boxShadow, shadow': 'shadows',
    textShadow: 'shadows',

    ...helpers,
  },
}
