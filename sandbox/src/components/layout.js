import React from 'react'
import UI from '../ui'
import Container from './container'
import Navbar from './navbar'

const { Global, Main } = UI

function Layout({ children }) {
  return (
    <>
      <Global
        xcss={{
          '*': {
            boxSizing: 'border-box',
          },
          body: {
            bg: 'black',
            color: 'white',
            fontFamily: 'sans',
            m: 0,
          },
        }}
      />
      <Navbar $logomark={{ children: 'Sm' }} />
      <Main py="15,,16,17">
        <Container>{children}</Container>
      </Main>
    </>
  )
}

export default Layout
