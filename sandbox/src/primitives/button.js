import React from 'react'
import { componentize } from 'styled-matter'
import UI from '../ui'

export default componentize(
  <UI.Button
    bg="primary"
    color="white"
    display="inline-block"
    fontSize="..3.4"
    fontWeight="bold"
    px="6...7"
    py="3...4"
    rounded={4}
    textDecoration="none"
  />
)
