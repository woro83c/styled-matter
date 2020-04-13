import { Children } from 'react'
import { jsx, css } from '@emotion/core'
import isPropValid from '@emotion/is-prop-valid'
import { get, getDisplayName, isNumber } from './util'

export default class Atom {
  constructor(element, props, config) {
    this.element = element
    this.props = props
    this.config = config
    this.breakpoints = [0, ...props.theme.breakpoints]
  }

  create() {
    const validProps = Object.fromEntries(
      Object.entries(this.props).filter(([propName]) => isPropValid(propName))
    )
    return jsx(this.element, {
      ...validProps,
      css: this.css(),
    })
  }

  css() {
    return this.breakpoints.reduce(
      (prev, breakpoint) => css([prev, this.cssStatement(breakpoint)]),
      {}
    )
  }

  /**
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#CSS_statements}
   */
  cssStatement(breakpoint) {
    const ruleset = this.cssRuleset(breakpoint)

    if (breakpoint) {
      return css({ [`@media (min-width: ${breakpoint})`]: ruleset })
    }

    return ruleset
  }

  /**
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#CSS_rulesets}
   */
  cssRuleset(breakpoint, props) {
    const { theme, ...rest } = props || this.props
    const result = Object.entries(rest).reduce((prev, [propName, expression]) => {
      if (propName === 'children' && breakpoint === 0) {
        return css([prev, this.pseudoCss()])
      }

      const escapedExpression = this.escapeExpression(expression)
      const value = this.cssValue(escapedExpression, breakpoint)

      // Require value
      if (!value && value !== 0) {
        return prev
      }

      const [property, config] = this.configEntry(propName)
      const vx = this.createValueFunction(value)

      /**
       * @example 'space'
       */
      if (typeof config === 'string') {
        return css([prev, { [property]: this.themeGet(`${config}.${value}`, value) }])
      }

      /**
       * @example ['space', margin]
       */
      if (Array.isArray(config)) {
        return css([prev, { [property]: vx(...config) }])
      }

      /**
       * @example vx => css({ borderRadius: vx('radii') })
       */
      if (typeof config === 'function') {
        return css([prev, config(vx)])
      }

      /**
       * @example undefined
       */
      if (this.isCssProperty(property)) {
        return css([prev, { [property]: this.themeGet(`${property}s.${value}`, value) }])
      }

      return prev
    }, {})

    return result
  }

  pseudoCss() {
    return Children.toArray(this.props.children).reduce((prev, { type, props }) => {
      const displayName = getDisplayName(type)

      if (displayName === 'Before' || displayName === 'After') {
        const selector = `&::${displayName.toLowerCase()}`
        const { children, ...rest } = props
        const content = Children.toArray(children)
          .filter((child) => typeof child === 'string')
          .join('')

        return css([prev, { [selector]: this.cssRuleset(0, { ...rest, content: `"${content}"` }) }])
      }

      return prev
    }, {})
  }

  escapeExpression(expression) {
    if (typeof expression !== 'string') {
      return expression
    }

    const matches = [...expression.matchAll(/'(.*?)'/g)]

    if (matches.length === 0) {
      return expression
    }

    const reducer = (prev, match, index) => {
      const { index: start, input } = match
      const end = start + match[0].length
      const { index: nextStart } = matches[index + 1] || {}

      const escapedValue = match[1].replace('.', '__PERIOD__')
      const before = index === 0 ? input.substring(0, start) : ''
      const after = input.substring(end, nextStart)

      return prev + before + escapedValue + after
    }

    return matches.reduce(reducer, '')
  }

  cssValue(expression, breakpoint) {
    if (typeof expression !== 'string') {
      return breakpoint === 0 ? expression : undefined
    }

    const values = expression.split('.').map((value) => value.replace('__PERIOD__', '.'))
    const index = this.breakpoints.indexOf(breakpoint)

    return values[index]
  }

  configEntry(propName) {
    const key = Object.keys(this.config).find((key) => this.parseConfigKey(key).includes(propName))
    const property = key ? this.parseConfigKey(key)[0] : propName
    const config = key && this.config[key]

    return [property, config]
  }

  parseConfigKey(key) {
    return key.split(',').map((propName) => propName.trim())
  }

  createValueFunction(value) {
    const vx = (scale, callback) => {
      if (!scale) {
        return value
      }

      if (typeof callback === 'function') {
        return callback(value, scale, this.props)
      }

      const parsed = this.themeGet(`${scale}.${value}`, value)

      if (typeof callback === 'string' && isNumber(parsed)) {
        return parsed + callback
      }

      return parsed
    }

    return vx
  }

  themeGet(path, defaultValue) {
    return get(this.props.theme, path, defaultValue)
  }

  isCssProperty(propName) {
    const { style } = document.createElement(null)
    const hasProperty = Object.prototype.hasOwnProperty.call(style, propName)

    return hasProperty
  }
}
