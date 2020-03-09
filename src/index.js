import Atom from './atom'
import defaultConfig from './default-config'
import defaultTheme from './default-theme'
import tags, { acronyms } from './tags'
import { componentize, upperFirst, useTheme } from './util'

export default function createUI(config) {
  const Matter = {}

  tags.forEach(tag => {
    const key = acronyms.includes(tag.toUpperCase()) ? tag.toUpperCase() : upperFirst(tag)

    Matter[key] = ({ as: asProp, ...props }) => {
      const theme = useTheme()
      const atom = new Atom(
        asProp || tag,
        {
          ...props,
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

  return Matter
}

export { componentize }
