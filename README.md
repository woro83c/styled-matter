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
- Inner props - easily apply one-off styles to nested components

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

```diff
function Intro() {
  return (
    <>
-     <H1 marginTop={0} marginBottom="'1.5rem'">
+     <H1 mt={0} mb="'1.5rem'">
        Styled Matter
      </H1>
-     <P marginTop={0} marginBottom="'1.5rem'">
+     <P mt={0} mb="'1.5rem'">
        Hello, world!
      </P>
      <Button
-       backgroundColor="fuchsia"
-       borderRadius={4}
+       bg="fuchsia"
        color="white"
        display="inline-block"
        fontWeight="bold"
-       padding="1rem 2rem"
+       p="1rem 2rem"
+       rounded={4}
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

Wrap the root of your application with Emotion's `<ThemeProvider>`, passing it your theme object:

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

```diff
function Intro() {
  return (
    <>
-     <H1 mt={0} mb="'1.5rem'">
+     <H1 mt={0} mb={6}>
        Styled Matter
      </H1>
-     <P mt={0} mb="'1.5rem'">
+     <P mt={0} mb={6}>
        Hello, world!
      </P>
      <Button
-       bg="fuchsia"
+       bg="primary"
        color="white"
        display="inline-block"
        fontWeight="bold"
-       p="1rem 2rem"
+       px={7}
+       py={4}
        rounded={4}
      >
        Get started
      </Button>
    </>
  )
}
```

Niceeee 👌

## Responsive styles

Common to utility-first frameworks is the ability to quickly set responsive styles directly in your markup. It's an approach that works really well to begin with, but as complexity increases - especially across breakpoints - markup can become bloated and hard to read.

Enter CSS **expressions**.

Using the `<Button>` element from our previous example, let's try to make it more responsive. As the screen widens, we want to:

- Increase its font size, and
- Increase its padding

While this is a slightly contrived example, here's how one might achieve this using [Tailwind CSS](https://tailwindcss.com):

```jsx
render(
  <Button className="bg-primary text-white inline-block md:text-lg lg:text-xl font-bold px-6 py-3 lg:px-7 lg:py-4 rounded-4">
    Get started
  </Button>
)
```

As you can see, it can be hard to tell what's going on here. Each utility is one of _many_ making up the salad. We can do much better though.

Using CSS expressions, we can target any or all breakpoints with a single style prop. We do it by passing a string literal containing values _separated by periods_ - with each period representing the gap between breakpoints:

```diff
render(
  <Button
    bg="primary"
    color="white"
    display="inline-block"
+   fontSize="..lg.xl"
    fontWeight="bold"
-   px={7}
-   py={4}
+   px="6...7"
+   py="3...4"
    rounded={4}
  >
    Get started
  </Button>
)
```

Using this syntax, we quickly get a feel for how this will look across breakpoints. Specifically, we can see:

- Font size increasing at the 2nd and 3rd breakpoints, and
- Padding increasing at the 3rd

### Escaping values

Due to the use of periods when separating values, _values containing periods_ must be wrapped in **single quotes** in order for them to be properly recognized.

👍 Styled Matter will **correctly** recognize two values here, i.e., `1.5rem` and `.75rem`:

```jsx
render(
  <Button px="'1.5rem'" py="'.75rem'">
    Yep
  </Button>
)
```

👎 Styled Matter will **incorrectly** recognize three values here, i.e., `1`, `5rem`, and `75rem`:

```jsx
render(
  <Button px="1.5rem" py=".75rem">
    Nope
  </Button>
)
```

## Components

Use `componentize` to set default props _automatically_ when composing components:

```jsx
import { componentize } from 'styled-matter'
import UI from './ui'

const Button = componentize(
  <UI.Button
    bg="primary"
    color="white"
    display="inline-block"
    fontSize="..lg.xl"
    fontWeight="bold"
    px="6...7"
    py="3...4"
    rounded={4}
  />
)
```

### `as` prop

Use the `as` prop to update the underlying element to be rendered:

```jsx
render(
  <Button as="a" href="#getting-started">
    Get started
  </Button>
)
```

### Inner props

[Composing components can be tricky](https://css-tricks.com/considerations-for-creating-a-card-component/), and refactoring a component for the sake of a one-off style can be especially annoying. Using **inner props** though, we can remedy this - here's how:

Using a `<Card>` component as a base, let's assume we need to update the underlying element for its inner title component. To make its props overrideable, simply pass a `$key` prop to it to serve as an identifier for later:

```diff
const Card = componentize(
  <Div>
    <Img src="https://source.unsplash.com/random" alt="">
-   <H5>Card title</H5>
+   <H5 $key="title">Card title</H5>
  </Div>
)
```

Using this identifier, we can now reach within our `<Card>` component to pass props to its inner `title` component. We do this by passing a prop just like any other - except an inner prop _must_ be marked by a single dollar symbol ($) prepended to its name:

```jsx
render(
  <Card $title={{ as: 'h2' }}>
)
```

Voilà! No refactor required 😎

> **Note**: Inner props are reserved for "componentized" components only.

## Custom UI

Customize UI by passing a config object to the `createUI` function:

```js
// ui.js
import createUI from 'styled-matter'
import config from './config'

export default createUI(config)
```

> **Note**: For an example, see [default config](https://github.com/woro83c/styled-matter/blob/master/src/default-config.js).


## Roadmap

- Improve documentation
- Pseudo-classes
- Pseudo-elements
