import { jsx, ThemeContext } from '@emotion/core'
import { useContext } from 'react'

export function componentize({ type, props }) {
  function Component(props) {
    return jsx(type, props)
  }

  Component.defaultProps = props

  return Component
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

export function isNumber(value) {
  const n = Number(value)
  return n === n
}

export function margin(value, scale, props) {
  let parsed

  if (value < 0) {
    const absolute = Math.abs(value)
    parsed = `-${get(props, `theme.${scale}.${absolute}`, absolute)}`
  } else {
    parsed = get(props, `theme.${scale}.${value}`, value)
  }

  if (isNumber(parsed) && parsed !== 0) {
    return `${parsed}px`
  }

  return parsed
}

export function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.substring(1)
}

export function useTheme() {
  return useContext(ThemeContext)
}
