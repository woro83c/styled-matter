import { useTheme } from 'emotion-theming'
import Atom from './atom'
import defaultConfig from './default-config'
import defaultTheme from './default-theme'
import tags, { acronyms } from './tags'
import { createComponent, themeGet, upperFirst } from './util'

export default function createMatter(config) {
  const Matter = {}

  tags.forEach(tag => {
    const key = acronyms.includes(tag.toUpperCase()) ? tag.toUpperCase() : upperFirst(tag)

    Matter[key] = props => {
      const theme = useTheme()
      const atom = new Atom(
        tag,
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

export { createComponent, themeGet }
