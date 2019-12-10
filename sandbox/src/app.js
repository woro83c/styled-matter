import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import Layout from './components/layout'
import theme from './theme'
import UI from './ui'

const { H1, P, A } = UI

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
        <A
          href="https://github.com/woro83c/styled-matter#getting-started"
          bg="primary"
          color="white"
          display="inline-block"
          fontSize="..3.4"
          fontWeight="bold"
          px="6...7"
          py="3...4"
          rounded={4}
          textDecoration="none"
        >
          Get started
        </A>
      </Layout>
    </ThemeProvider>
  )
}

export default App
