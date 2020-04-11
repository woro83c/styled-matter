import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import Layout from './components/layout'
import Button from './primitives/button'
import theme from './theme'
import UI from './ui'

const { H1, P } = UI

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <H1 fontSize="7..8.9" mt={0} mb={6}>
          Styled Matter
        </H1>
        <P fontSize={4} mt={0} mb={6}>
          One bit of UI to style them all
        </P>
        <Button as="a" href="https://github.com/woro83c/styled-matter#getting-started">
          Get started
        </Button>
      </Layout>
    </ThemeProvider>
  )
}

export default App
