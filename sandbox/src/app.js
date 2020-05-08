import { ThemeProvider } from 'emotion-theming'
import React from 'react'
import Layout from './components/layout'
import theme from './theme'
import UI from './ui'

const { Before, Button, H1, P } = UI

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <H1 fontSize="7,,8,9" fontWeight={800} mt={0} mb={6}>
          Styled Matter
        </H1>
        <P fontSize={4} mt={0} mb={6}>
          One bit of UI to style them all
        </P>
        <Button
          as="a"
          bg="transparent"
          color="primary"
          fontSize={6}
          href="https://github.com/woro83c/styled-matter#getting-started"
          px={0}
          py={0}
          target="_blank"
          xcss={{ '&:hover, &:focus': { color: 'magenta.600' } }}
        >
          {/* eslint-disable-next-line */}
          <Before mr=".2em">🚀</Before>
          Get started
        </Button>
      </Layout>
    </ThemeProvider>
  )
}

export default App
