import React from 'react'
import { Global, css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import createMatter, { createComponent } from 'styled-matter'
import theme from './theme'

const { A, Div, H1, Header, Main, P, Span } = createMatter()

// Auto-set props as default props using `createComponent`
const Container = createComponent(<Div maxWidth={1280} mx="auto" px="4..6.8" />)

function App() {
  return (
    <ThemeProvider theme={theme}>
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
        <Container>
          <H1 fontSize="7..8.9" mt={0} mb={6}>
            Styled Matter
          </H1>
          <P fontSize={4} mt={0} mb={6}>
            One React component to style them all
          </P>
          <A
            href="https://github.com/woro83c/styled-matter#get-started"
            bg="primary"
            borderRadius={4}
            color="white"
            display="inline-block"
            fontSize="..3.4"
            fontWeight="bold"
            px="6...7"
            py="3...4"
            textDecoration="none"
          >
            Get started
          </A>
        </Container>
      </Main>
    </ThemeProvider>
  )
}

export default App
