import React from 'react'
import { componentize } from 'styled-matter'
import Container from './container'
import UI from '../ui'

const { A, Header, Span } = UI

export default componentize(
  <Header borderBottom="1px solid" borderBottomColor="dark" py={5}>
    <Container $key="container">
      <A
        alignItems="center"
        color="inherit"
        display="flex"
        fontSize={4}
        fontWeight="bold"
        href="https://github.com/woro83c/styled-matter"
        textDecoration="none"
      >
        <Span
          alignItems="center"
          aria-hidden="true"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          mr="'.5ch'"
          size="1em"
        >
          <Span
            $key="logomark"
            border="'.025em solid'"
            lineHeight={2}
            size="2em"
            textAlign="center"
            transform="'scale(.5)'"
          />
        </Span>
        Styled Matter
      </A>
    </Container>
  </Header>
)
