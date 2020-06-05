import { ThemeContext } from '@emotion/core'
import { cloneElement, useContext, useEffect, useState } from 'react'

export function camelCase(string) {
  return (string || '')
    .split(/-/g)
    .filter(Boolean)
    .reduce((prev, cur, index) => {
      cur = cur.toLowerCase()
      return prev + (index ? upperFirst(cur) : cur)
    }, '')
}

export function componentize(element) {
  function Component(props) {
    return cloneElement(element, props)
  }

  Component.defaultProps = element.props

  return Component
}

export function findLast(array, predicate) {
  return [...array].reverse().find(predicate)
}

/**
 * @see {@link https://github.com/developit/dlv}
 */
export function get(obj, key, def, p, undef) {
  key = key.split ? key.split('.') : key

  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef
  }

  return obj === undef ? def : obj
}

export function getBorder(value, scale, props) {
  const values = typeof value === 'string' ? value.split(' ').filter(Boolean) : [value]

  if (values.length === 3) {
    let [width, style, color] = values
    width = get(props, `theme.borderWidths.${width}`, width)
    style = get(props, `theme.borderStyles.${style}`, style)
    color = get(props, `theme.colors.${color}`, color)

    return `${width} ${style} ${color}`
  }

  return get(props, `theme.${scale}.${value}`, value)
}

/**
 * @see {@link https://github.com/acdlite/recompose}
 */
export function getDisplayName(Component) {
  if (typeof Component === 'string') {
    return Component
  }

  if (!Component) {
    return undefined
  }

  return Component.displayName || Component.name || 'Component'
}

export function getSpace(value, scale, props) {
  const mapper = (value) => {
    if (value < 0) {
      const absolute = Math.abs(value)
      return `-${get(props, `theme.${scale}.${absolute}`, absolute)}`
    }

    return get(props, `theme.${scale}.${value}`, value)
  }

  if (typeof value === 'string') {
    return value.split(' ').filter(Boolean).map(mapper).join(' ')
  }

  return mapper(value)
}

export function isNumber(value) {
  const n = Number(value)
  return n === n
}

export function pickBy(object, predicate) {
  return Object.fromEntries(Object.entries(object).filter(predicate))
}

export function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.substring(1)
}

export function useResponsiveEmbed(responsiveEmbeds, defaultElement) {
  const { width = 0 } = useWindowSize() || {}
  const { breakpoints } = useTheme()
  const finder = (embed, index) => width > parseInt([...breakpoints].reverse()[index])
  const result = findLast(responsiveEmbeds, finder) || defaultElement

  return result
}

export function useTheme() {
  return useContext(ThemeContext)
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize)

  function getSize() {
    const { innerWidth, innerHeight } = window || {}
    return {
      width: innerWidth,
      height: innerHeight,
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') return

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
