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

[Check out the demo sandbox](https://codesandbox.io/s/github/woro83c/styled-matter/tree/master/sandbox)

## Features

- CSS-as-props - style your app using theme-aware CSS props only
- Cleaner responsive styles with CSS _expressions_
- Easy to grok markup using HTML-like primitives
- Reduced boilerplate - create all primitive UI with a single line

## Getting started

Install Styled Matter and its dependencies:

```sh
npm install styled-matter @emotion-core
```

### Create UI

Create and export a UI object for use across your app:

```js
// ui.js
import createUI from 'styled-matter'

export default createUI()
```

> **Note:** The `createUI` function also accepts a `config` object, making UI and style props highly configurable - see [Custom UI](#custom-ui).

### Use UI

All HTML and SVG elements are made available as capitalized keys on the UI object. Import the UI object and destructure components as needed:

```jsx
// intro.js
import UI from './ui'

const { H1, P, Button } = UI

function Intro() {
  return (
    <>
      <H1>Styled Matter</H1>
      <P>Hello, world!</P>
      <Button>Get started</Button>
    </>
  )
}
```

> **Note:** Some component names have been converted into uppercase - see [acronyms](https://github.com/woro83c/styled-matter/blob/master/src/tags.js#L140).

### Style UI

Style your UI entirely with style props - simply use [object styles](https://emotion.sh/docs/object-styles) to write plain old CSS directly in your markup:

```jsx
function Intro() {
  return (
    <>
      <H1 marginTop={0} marginBottom="'1.5rem'">
        Styled Matter
      </H1>
      <P marginTop={0} marginBottom="'1.5rem'">
        Hello, world!
      </P>
      <Button
        backgroundColor="fuchsia"
        borderRadius={4}
        color="white"
        display="inline-block"
        fontWeight="bold"
        padding="1rem 2rem"
      >
        Get started
      </Button>
    </>
  )
}
```

> **Note:** Values containing periods must be escaped using single quotes - see [Responsive styles](#responsive-styles).

## To do

- Documentation, etc.
