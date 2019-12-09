import React from 'react'
import { componentize } from 'styled-matter'
import UI from '../ui'

// Auto-set props as default props using `componentize`
export default componentize(<UI.Div maxWidth={1280} mx="auto" px="4..6.8" />)
