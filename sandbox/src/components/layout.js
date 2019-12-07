import React from 'react'
import { Global, css } from '@emotion/core'
import Container from './container'
import UI from '../ui'

const { Header, A, Span, Main } = UI

function Layout({ children }) {
  return (
    <>
      <Global
        styles={theme => css`
          * {
            box-sizing: border-box;
          }

          body {
            background-color: black;
            color: white;
            font-family: ${theme.fonts.sans};
            margin: 0;
          }
        `}
      />
      <Header borderBottom="1px solid" borderBottomColor="dark" py={5}>
        <Container>
          <A
            href="https://github.com/woro83c/styled-matter"
            alignItems="center"
            color="inherit"
            display="flex"
            fontSize={4}
            fontWeight="bold"
            textDecoration="none"
          >
            <Span
              aria-hidden="true"
              alignItems="center"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              mr="'.5ch'"
              size="1em"
            >
              <Span
                border="'.025em solid'"
                lineHeight={2}
                size="2em"
                textAlign="center"
                transform="'scale(.5)'"
              >
                Sm
              </Span>
            </Span>
            Styled Matter
          </A>
        </Container>
      </Header>
      <Main py="15..16.17">
        <Container>{children}</Container>
      </Main>
    </>
  )
}

export default Layout
