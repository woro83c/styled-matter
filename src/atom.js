import { Global, css, jsx } from '@emotion/core'
import isPropValid from '@emotion/is-prop-valid'
import { Children, cloneElement, createElement, isValidElement } from 'react'
import cssProperties from './css-properties'
import { camelCase, findLast, get, getDisplayName, isNumber, pickBy, useResponsive } from './util'

export default class Atom {
  constructor(element, props, config) {
    this.element = element
    this.breakpoints = this.parseBreakpoints(props.theme.breakpoints)
    this.props = this.parseProps(props)
    this.config = config
    this.cssProperties = cssProperties.map(camelCase)
  }

  parseBreakpoints(breakpoints) {
    return [
      0,
      ...breakpoints.map((breakpoint) => (isNumber(breakpoint) ? `${breakpoint}px` : breakpoint)),
    ]
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

    this.embeds = this.parseEmbeds(embeds)

    return { ...parsedProps, children: this.mapEmbeds(embeds, children) }
  }

  parseEmbeds(embeds) {
    if (!embeds) {
      return null
    }

    const validKeys = Object.keys(this.breakpoints).slice(1)
    const filteredEmbeds = pickBy(embeds, ([propName]) => !validKeys.includes(propName))
    const responsive = this.breakpoints.slice(1).map((breakpoint, index) => embeds[index + 1])

    if (responsive.filter(Boolean).length) {
      filteredEmbeds.responsive = responsive
    }

    return filteredEmbeds
  }

  mapEmbeds(embeds, children, level = 1) {
    if (!embeds) {
      return children
    }

    const result = Children.map(children, (element, index) => {
      if (!isValidElement(element)) {
        return element
      }

      const { key, props } = element
      const matches = Object.entries(embeds).filter(([propName]) => {
        if ((props.className || '').includes(propName)) {
          return true
        }

        if (level > 1) {
          return false
        }

        const conditions = [
          propName === 'first-child' && index === 0,
          propName === 'last-child' && index === Children.count(children) - 1,
          propName === 'odd-child' && index % 2 === 0,
          propName === 'even-child' && index % 2,
        ]

        return conditions.filter(Boolean).length
      })

      const finder = ([, value]) =>
        value === null || typeof value !== 'object' || isValidElement(value)
      let [, value] = findLast(matches, finder) || []

      if (value === null || typeof value === 'string') {
        return value
      }

      if (typeof value === 'function') {
        value = createElement(value, { key, ...props })
      }

      if (isValidElement(value)) {
        return cloneElement(value, { key })
      }

      const embedProps = matches.reduce((prev, [, value]) => ({ ...prev, ...value }), {})
      const { children: innerChildren, ...rest } = { ...props, ...embedProps }

      return cloneElement(element, rest, this.mapEmbeds(embeds, innerChildren, level + 1))
    })

    return result
  }

  create() {
    if (this.element === 'global') {
      return jsx(Global, { styles: this.xcss() })
    }

    const validProps = pickBy(this.props, ([propName]) => isPropValid(propName))
    const props = { ...validProps, css: css([this.css(), this.xcss(), this.children()]) }
    const element = jsx(this.element, props)

    /**
     * Responsive embeds
     * @example <Span $1="sm" $2="md" $3="lg">xs</Span>
     */
    if (this.embeds && this.embeds.responsive) {
      const responsiveEmbeds = this.parseResponsiveEmbeds(element)
      return useResponsive(responsiveEmbeds, element)
    }

    return element
  }

  css(props = this.props, skipValidation) {
    return this.breakpoints
      .map((breakpoint) => this.cssStatement(props, breakpoint, skipValidation))
      .filter(Boolean)
  }

  /**
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#CSS_statements}
   */
  cssStatement(props, breakpoint, skipValidation) {
    const ruleset = this.cssRuleset(props, breakpoint, skipValidation)

    if (ruleset && breakpoint) {
      return css({ [`@media (min-width: ${breakpoint})`]: ruleset })
    }

    return ruleset
  }

  /**
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#CSS_rulesets}
   */
  cssRuleset(props, breakpoint, skipValidation) {
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
        return [...prev, { [property]: this.themeGet(`${config}.${value}`, value) }]
      }

      /**
       * @example ['space', margin]
       */
      if (Array.isArray(config)) {
        return [...prev, { [property]: vx(...config) }]
      }

      /**
       * @example vx => ({ borderRadius: vx('radii') })
       */
      if (typeof config === 'function') {
        return [...prev, config(vx)]
      }

      /**
       * @example { listStyle: 'none', paddingLeft: 0 }
       */
      if (typeof config === 'object') {
        return [...prev, config]
      }

      /**
       * @example undefined
       */
      if (skipValidation || this.cssProperties.includes(property)) {
        return [...prev, { [property]: this.themeGet(`${property}s.${value}`, value) }]
      }

      return prev
    }, [])

    return result.length ? result : null
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

      const escapedValue = match[1].replace(/,/g, '__COMMA__')
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

    const values = expression.split(',').map((value) => value.replace(/__COMMA__/g, ',').trim())
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

  xcss() {
    const { xcss } = this.props
    if (!xcss) return null
    return Object.entries(xcss).map(([selector, props]) => ({ [selector]: this.css(props, true) }))
  }

  children() {
    const result = Children.toArray(this.props.children).reduce((prev, { type, props }) => {
      const displayName = getDisplayName(type)

      if (displayName === 'Before' || displayName === 'After') {
        const selector = `&::${displayName.toLowerCase()}`
        const { children, ...rest } = props
        const content = Children.toArray(children)
          .filter((child) => typeof child === 'string')
          .join('')

        return [...prev, { [selector]: this.css({ ...rest, content }) }]
      }

      return prev
    }, [])

    return result.length ? result : null
  }

  parseResponsiveEmbeds(defaultElement) {
    const reducer = (prev, cur) => {
      if (!cur || typeof cur === 'string') {
        return [...prev, cur]
      }

      if (typeof cur === 'function') {
        const { props } = findLast(prev, isValidElement) || defaultElement
        return [...prev, createElement(cur, props)]
      }

      if (isValidElement(cur)) {
        return [...prev, cloneElement(cur)]
      }

      if (typeof cur === 'object') {
        const last = findLast(prev, isValidElement)

        if (last) {
          return [...prev, cloneElement(last, cur)]
        }

        const atom = new Atom(this.element, { ...this.props, ...cur }, this.config)
        return [...prev, atom.create()]
      }

      return [...prev, cur]
    }

    return this.embeds.responsive.reduce(reducer, [])
  }
}
