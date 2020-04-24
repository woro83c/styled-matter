import Atom from './atom'
import defaultConfig from './default-config'
import defaultTheme from './default-theme'
import tags, { acronyms } from './tags'
import { componentize, upperFirst, useTheme } from './util'

export default function createUI(config) {
  const Matter = {}

  tags.forEach((tag) => {
    const key = acronyms.includes(tag.toUpperCase()) ? tag.toUpperCase() : upperFirst(tag)

    Matter[key] = ({ as: asProp, ...rest }) => {
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
  Matter.Before = function Before() { return null }
  Matter.After = function After() { return null }
  /* eslint-enable */

  return Matter
}

export { componentize }
