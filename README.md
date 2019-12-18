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

### Aliases

Free your markup from bloat using aliases. Sourced from popular CSS frameworks, Styled Matter uses common shorthand syntax to alias some of the more verbose prop names for you:

```jsx
function Intro() {
  return (
    <>
      <H1 mt={0} mb="'1.5rem'">
        Styled Matter
      </H1>
      <P mt={0} mb="'1.5rem'">
        Hello, world!
      </P>
      <Button
        bg="fuchsia"
        color="white"
        display="inline-block"
        fontWeight="bold"
        p="1rem 2rem"
        rounded={4}
      >
        Get started
      </Button>
    </>
  )
}
```

### Theming

Get started by creating a theme object - theme objects should conform to the [System UI Theme Specification](https://system-ui.com/theme):

```js
// theme.js
export default {
  space: [
    0,
    '.25rem',
    '.5rem',
    '.75rem',
    '1rem',
    '1.25rem',
    '1.5rem',
    '2rem',
  ],
  colors: {
    primary: 'fuchsia',
    dark: 'hsl(0, 0%, 10%)',
  }
}
```

Using Emotion's theming library, we can now make these values accessible to all our UI via style props. Start by installing the library:

```sh
npm install emotion-theming
```

Wrap the root of your application with Emotion's `<ThemeProvider>`, passing it your theme object.

```jsx
import { ThemeProvider } from 'emotion-theming'
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Intro />
    </ThemeProvider>
  )
}
```

Now, let's update our `<Intro>` component to use values from our theme:

```js
function Intro() {
  return (
    <>
      <H1 mt={0} mb={6}>
        Styled Matter
      </H1>
      <P mt={0} mb={6}>
        Hello, world!
      </P>
      <Button
        bg="primary"
        color="white"
        display="inline-block"
        fontWeight="bold"
        px={7}
        py={4}
        rounded={4}
      >
        Get started
      </Button>
    </>
  )
}
```

Niceeee 👌

## To do

- Documentation, etc.
