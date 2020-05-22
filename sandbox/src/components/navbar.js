import React from 'react'
import { componentize } from 'styled-matter'
import UI from '../ui'
import Container from './container'

const { A, Header, Span } = UI

export default componentize(
  <Header borderBottom="1px solid dark" py={5}>
    <Container>
      <A
        alignItems="center"
        color="inherit"
        display="flex"
        fontSize={4}
        fontWeight={800}
        href="https://styledmatter.com"
        rel="noopener noreferrer"
        target="_blank"
        textDecoration="none"
      >
        <Span
          alignItems="center"
          aria-hidden="true"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          mr=".5ch"
          size="1em"
        >
          <Span
            border=".025em solid"
            className="logomark"
            lineHeight={2}
            size="2em"
            textAlign="center"
            transform="scale(.5)"
          />
        </Span>
        Styled Matter
      </A>
    </Container>
  </Header>
)
