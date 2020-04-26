import Atom from './atom'
import defaultConfig from './default-config'
import defaultTheme from './default-theme'
import tags, { acronyms } from './tags'
import { componentize, upperFirst, useTheme } from './util'

export default function createUI(config) {
  const UI = {}

  tags.forEach((tag) => {
    const key = acronyms.includes(tag.toUpperCase()) ? tag.toUpperCase() : upperFirst(tag)

    UI[key] = ({ as: asProp, ...rest }) => {
      const theme = useTheme()
      const atom = new Atom(
        asProp || tag,
        {
          ...rest,
          theme: { ...defaultTheme, ...theme },
        },
        {
          ...defaultConfig,
          ...config,
        }
      )

      return atom.create()
    }
  })

  // Pseudo-components
  /* eslint-disable prettier/prettier */
  UI.Before = function Before() { return null }
  UI.After = function After() { return null }
  /* eslint-enable */

  return UI
}

export { componentize }
