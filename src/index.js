import { forwardRef } from 'react'
import Atom from './atom'
import defaultConfig from './default-config'
import defaultTheme from './default-theme'
import tags, { acronyms } from './tags'
import { componentize, upperFirst, useTheme } from './util'

export default function createUI(config = {}) {
  let { props, defaultProps } = defaultConfig
  props = { ...props, ...config.props }
  defaultProps = { ...defaultProps, ...config.defaultProps }
  const UI = {}

  for (const tag of tags) {
    const key = acronyms.includes(tag.toUpperCase()) ? tag.toUpperCase() : upperFirst(tag)

    UI[key] = forwardRef(({ as: asProp, ...rest }, ref) => {
      const theme = useTheme()
      const atom = new Atom(
        asProp || tag,
        {
          ref,
          ...rest,
          theme: { ...defaultTheme, ...theme },
        },
        props
      )

      return atom.create()
    })

    UI[key].defaultProps = defaultProps[tag]
  }

  // Pseudo-elements
  UI.Before = () => null
  UI.After = () => null
  UI.Before.displayName = 'Before'
  UI.After.displayName = 'After'

  return UI
}

export { componentize, defaultTheme }
