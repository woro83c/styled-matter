import React from 'react'
import { createComponent } from 'styled-matter'
import UI from '../ui'

// Auto-set props as default props using `createComponent`
export default createComponent(<UI.Div maxWidth={1280} mx="auto" px="4..6.8" />)
