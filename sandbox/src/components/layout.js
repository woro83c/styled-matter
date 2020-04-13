import React from 'react'
import { Global, css } from '@emotion/core'
import Container from './container'
import Navbar from './navbar'
import UI from '../ui'

const { Main } = UI

function Layout({ children }) {
  return (
    <>
      <Global
        styles={(theme) => css`
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
      <Navbar $logomark={{ children: 'Sm' }} />
      <Main py="15..16.17">
        <Container>{children}</Container>
      </Main>
    </>
  )
}

export default Layout
