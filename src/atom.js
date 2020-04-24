import { Children, cloneElement, isValidElement } from 'react'
import { jsx, css } from '@emotion/core'
import isPropValid from '@emotion/is-prop-valid'
import { get, getDisplayName, isNumber } from './util'

export default class Atom {
  constructor(element, props, config) {
    this.element = element
    this.props = this.parseProps(props)
    this.config = config
    this.breakpoints = [0, ...props.theme.breakpoints]
  }

  parseProps(props) {
    const reducer = (prev, [propName, value]) => {
      if (propName.startsWith('$')) {
        return { ...prev, embeds: { ...prev.embeds, [propName.substring(1)]: value } }
      }

      return { ...prev, [propName]: value }
    }

    const result = Object.entries(props).reduce(reducer, {})
    const { children, embeds, ...parsedProps } = result

    return { ...parsedProps, children: this.mapEmbeds(embeds, children) }
  }

  mapEmbeds(embeds, children) {
    if (!embeds) {
      return children
    }

    const result = Children.toArray(children).map((element) => {
      if (!isValidElement(element)) {
        return element
      }

      const { key, props } = element
      const [, value] =
        Object.entries(embeds).find(([propName]) => props.className || ''.includes(propName)) || []

      if (value === null) {
        return null
      }

      if (isValidElement(value)) {
        return cloneElement(value, { key })
      }

      // Component
      if (typeof value === 'function') {
        return jsx(value, { key, ...props })
      }

      // Props
      const { children, ...rest } = { ...props, ...value }
      return cloneElement(element, rest, this.mapEmbeds(embeds, children))
    })

    return result
  }

  create() {
    const validProps = Object.fromEntries(
      Object.entries(this.props).filter(([propName]) => isPropValid(propName))
    )
    return jsx(this.element, {
      ...validProps,
      css: css([this.css(), this.xcss(), this.children()]),
    })
  }

  css(props = this.props) {
    return this.breakpoints.map((breakpoint) => this.cssStatement(props, breakpoint))
  }

  /**
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#CSS_statements}
   */
  cssStatement(props, breakpoint) {
    const ruleset = this.cssRuleset(props, breakpoint)

    if (breakpoint) {
      return css({ [`@media (min-width: ${breakpoint})`]: ruleset })
    }

    return ruleset
  }

  /**
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#CSS_rulesets}
   */
  cssRuleset(props, breakpoint) {
    const { children, theme, xcss, ...rest } = props
    const result = Object.entries(rest).reduce((prev, [propName, expression]) => {
      const escapedExpression = this.escapeExpression(expression)
      let value = this.cssValue(escapedExpression, breakpoint)

      // Require value
      if (!value && value !== 0) {
        return prev
      }

      // `content` prop
      if (propName === 'content') {
        value = `"${value}"`
      }

      const [property, config] = this.configEntry(propName)
      const vx = this.createValueFunction(value)

      /**
       * @example 'space'
       */
      if (typeof config === 'string') {
        return [prev, { [property]: this.themeGet(`${config}.${value}`, value) }]
      }

      /**
       * @example ['space', margin]
       */
      if (Array.isArray(config)) {
        return [prev, { [property]: vx(...config) }]
      }

      /**
       * @example vx => css({ borderRadius: vx('radii') })
       */
      if (typeof config === 'function') {
        return [prev, config(vx)]
      }

      /**
       * @example undefined
       */
      if (this.isCssProperty(property)) {
        return [prev, { [property]: this.themeGet(`${property}s.${value}`, value) }]
      }

      return prev
    }, [])

    return result
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

      const escapedValue = match[1].replace(',', '__COMMA__')
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

    const values = expression.split(',').map((value) => value.replace('__COMMA__', ',').trim())
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

  xcss() {
    const { xcss } = this.props
    if (!xcss) return null
    return Object.entries(xcss).map(([selector, props]) => ({ [selector]: this.css(props) }))
  }

  children() {
    return Children.toArray(this.props.children).reduce((prev, { type, props }) => {
      const displayName = getDisplayName(type)

      if (displayName === 'Before' || displayName === 'After') {
        const selector = `&::${displayName.toLowerCase()}`
        const { children, ...rest } = props
        const content = Children.toArray(children)
          .filter((child) => typeof child === 'string')
          .join('')

        return [prev, { [selector]: this.css({ ...rest, content }) }]
      }

      return prev
    }, [])
  }
}
