import helpers from './helpers'
import { margin } from './util'

export default {
  props: {
    'margin, m': ['space', margin],
    'marginTop, mt': ['space', margin],
    'marginBottom, mb': ['space', margin],
    'marginLeft, ml': ['space', margin],
    'marginRight, mr': ['space', margin],
    'marginX, mx': (vx) => ({
      marginLeft: vx('space', margin),
      marginRight: vx('space', margin),
    }),
    'marginY, my': (vx) => ({
      marginTop: vx('space', margin),
      marginBottom: vx('space', margin),
    }),
    'padding, p': 'space',
    'paddingTop, pt': 'space',
    'paddingBottom, pb': 'space',
    'paddingLeft, pl': 'space',
    'paddingRight, pr': 'space',
    'paddingX, px': (vx) => ({
      paddingLeft: vx('space'),
      paddingRight: vx('space'),
    }),
    'paddingY, py': (vx) => ({
      paddingTop: vx('space'),
      paddingBottom: vx('space'),
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
      top: vx('space'),
      bottom: vx('space'),
      left: vx('space'),
      right: vx('space'),
    }),
    insetX: (vx) => ({
      left: vx('space'),
      right: vx('space'),
    }),
    insetY: (vx) => ({
      top: vx('space'),
      bottom: vx('space'),
    }),
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
