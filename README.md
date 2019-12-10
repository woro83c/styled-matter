# Styled Matter [Sm]

One bit of UI to style them all

```jsx
import createUI from 'styled-matter'

const UI = createUI()
const { H1, P, Button, ...etc } = UI

function Intro() {
  return (
    <>
      <H1 fontSize="7..8.9" mt={0} mb={6}>
        Styled Matter
      </H1>
      <P fontSize={4} mt={0} mb={6}>
        One bit of UI to style them all
      </P>
      <Button
        bg="primary"
        border="1px solid transparent"
        color="white"
        fontSize="..3.4"
        fontWeight="bold"
        px="6...7"
        py="3...4"
        rounded={4}
      >
        Get started
      </Button>
    </>
  )
}
```

## Give it a whirl

[Check out the demo sandbox](#https://codesandbox.io/s/github/woro83c/styled-matter/tree/master/sandbox)

## Features

- CSS-as-props - style your app using theme-aware CSS props only
- Cleaner responsive styles using CSS *expressions*
- Easy to grok markup using HTML-like primitives
- Reduced boilerplate - create all primitive UI with a single line

## Getting started

Install Styled Matter and its dependencies:

```sh
npm install styled-matter @emotion-core
```

## To-do

- Documentation, etc.
