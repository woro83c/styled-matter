import { jsx, ThemeContext } from '@emotion/core'
import { Children, cloneElement, isValidElement, useContext } from 'react'

export function componentize({ type, props }) {
  function Component(props) {
    return jsx(type, parseProps(props))
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

export function mapInnerProps(innerProps, children) {
  if (!innerProps) {
    return children
  }

  const result = Children.toArray(children).map(element => {
    if (!isValidElement(element)) {
      return element
    }

    let { props } = element
    const { children, uiid } = props

    if (uiid) {
      const [, value] = Object.entries(innerProps).find(([key]) => key === uiid) || []
      props = { ...props, ...value }
    }

    return cloneElement(element, props, mapInnerProps(innerProps, children))
  })

  return result
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

export function parseProps(props) {
  const reducer = (prev, [key, value]) => {
    if (key.startsWith('__')) {
      return { ...prev, innerProps: { ...prev.innerProps, [key.substring(2)]: value } }
    }

    return { ...prev, [key]: value }
  }

  const result = Object.entries(props).reduce(reducer, {})
  const { children, innerProps, ...parsedProps } = result

  return { ...parsedProps, children: mapInnerProps(innerProps, children) }
}

export function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.substring(1)
}

export function useTheme() {
  return useContext(ThemeContext)
}
