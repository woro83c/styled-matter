import { useTheme } from 'emotion-theming'
import get from 'lodash.get'
import { createElement } from 'react'
import defaultTheme from './default-theme'

export function createComponent({ type, props }) {
  function Component({ children, ...props }) {
    return createElement(type, props, children)
  }

  Component.defaultProps = props

  return Component
}

export function isNumber(value) {
  const n = Number(value)
  return n === n
}

export function margin(value, scale) {
  let parsed

  if (value < 0) {
    const absolute = Math.abs(value)
    parsed = `-${themeGet(`${scale}.${absolute}`, absolute)}`
  } else {
    parsed = themeGet(`${scale}.${value}`, value)
  }

  if (isNumber(parsed)) {
    return `${parsed}px`
  }

  return parsed
}

export function themeGet(path, defaultValue) {
  const theme = useTheme()
  return get({ ...defaultTheme, ...theme }, path, defaultValue)
}

export function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.substring(1)
}
