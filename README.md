# Styled Matter [Sm]

One bit of UI to style them all

```jsx
import createUI from 'styled-matter'

const UI = createUI()
const { H1, P, Button, ...etc } = UI

function Intro() {
  return (
    <>
      <H1 fontSize="7,,8,9" mt={0} mb={6}>
        Styled Matter
      </H1>
      <P fontSize={4} mt={0} mb={6}>
        One bit of UI to style them all
      </P>
      <Button
        bg="primary"
        border="1px solid transparent"
        color="white"
        fontSize=",,3,4"
        fontWeight="bold"
        px="6,,,7"
        py="3,,,4"
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
- Embeds - customize nested JSX elements with ease

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
      <H1 marginTop={0} marginBottom="1.5rem">
        Styled Matter
      </H1>
      <P marginTop={0} marginBottom="1.5rem">
        Hello, world!
      </P>
      <Button
        backgroundColor="magenta"
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

> **Note:** Values containing commas must be escaped using single quotes - see [Responsive styles](#responsive-styles).

### Aliases

Free your markup from bloat using aliases. Sourced from popular CSS frameworks, Styled Matter uses common shorthand syntax to alias some of the more verbose prop names for you:

```diff
function Intro() {
  return (
    <>
-     <H1 marginTop={0} marginBottom="1.5rem">
+     <H1 mt={0} mb="1.5rem">
        Styled Matter
      </H1>
-     <P marginTop={0} marginBottom="1.5rem">
+     <P mt={0} mb="1.5rem">
        Hello, world!
      </P>
      <Button
-       backgroundColor="magenta"
-       borderRadius={4}
+       bg="magenta"
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
    primary: 'magenta',
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
-     <H1 mt={0} mb="1.5rem">
+     <H1 mt={0} mb={6}>
        Styled Matter
      </H1>
-     <P mt={0} mb="1.5rem">
+     <P mt={0} mb={6}>
        Hello, world!
      </P>
      <Button
-       bg="magenta"
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
<Button className="bg-primary text-white inline-block md:text-lg lg:text-xl font-bold px-6 py-3 lg:px-7 lg:py-4 rounded-4">
  Get started
</Button>
```

As you can see, it can be hard to tell what's going on here. Each utility is one of _many_ making up the salad. We can do much better though.

Using CSS expressions, we can target any or all breakpoints with a single style prop. We do it by passing a string literal containing values _separated by commas_ - with each comma representing the gap between breakpoints:

```diff
<Button
  bg="primary"
  color="white"
  display="inline-block"
+ fontSize=",,lg,xl"
  fontWeight="bold"
- px={7}
- py={4}
+ px="6,,,7"
+ py="3,,,4"
  rounded={4}
>
  Get started
</Button>
```

Using this syntax, we quickly get a feel for how this will look across breakpoints. Specifically, we can see:

- Font size increasing at the 2nd and 3rd breakpoints, and
- Padding increasing at the 3rd

### Escaping values

Due to the use of commas when separating values, _values containing commas_ must be wrapped in **single quotes** in order for them to be properly recognized.

👍 Styled Matter will **correctly** recognize a single value here:

```jsx
<Button bg="'rgb(255, 0, 255)'">
  Yep
</Button>
```

👎 Styled Matter will **incorrectly** recognize three values here, i.e., `rgb(255`, `0`, and `255)`:

```jsx
<Button bg="rgb(255, 0, 255)">
  Nope
</Button>
```

## Extra CSS

Use the `xcss` prop to style what you can't using standard style props alone. It extends Emotion's `css` prop, allowing it to [pick up values from your theme](#theming) while also supporting [aliases](#aliases).

### Hover

```jsx
<Button
  bg="transparent"
  border="1px solid"
  color="primary"
  xcss={{
    '&:hover': {
      bg: 'primary',
      color: 'white'
    }
  }}
>
  Get started
</Button>
```

### Group-hover

```jsx
<Div
  bg="white"
  xcss={{
    '&:hover': {
      bg: 'primary',
    },
    '&:hover *': {
      color: 'white'
    }
  }}
>
  <H5 color="dark">Card title</H5>
  <A href="#" color="dark">Card link</A>
</Div>
```

## Pseudo-elements

```jsx
const { Before, After } = UI

render(
  <Button>
    <Before mr=".2em">🚀</Before>
    Get started
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
    fontSize=",,lg,xl"
    fontWeight="bold"
    px="6,,,7"
    py="3,,,4"
    rounded={4}
  />
)
```

### `as` prop

Use the `as` prop to update the underlying element to be rendered:

```jsx
<Button as="a" href="#getting-started">
  Get started
</Button>
```

### Embeds

[Composing components can be tricky](https://css-tricks.com/considerations-for-creating-a-card-component/), and refactoring a component for the sake of a one-off customization can be especially annoying. Using **embeds** though, we can remedy this.

Using a `<Card>` component as a base, let's assume we need to customize its inner link elements. To do this, start by adding some CSS classes to its link elements to serve as identifiers for later.

```diff
function Card({ children, ...rest }) {
  return (
    <Div {...rest}>
      <Img src="https://source.unsplash.com/random" alt="">
      <H5>Card title</H5>

      {children}

-     <A href="#">Card link</A>
-     <A href="#">Another link</A>
+     <A href="#" className="link card-link">Card link</A>
+     <A href="#" className="link another-link">Another link</A>
    </Div>
  )
}
```

Using these classes, we can now reach within our `<Card>` component to customize each of its inner link elements - here's how:

#### Embed elements

_An embed element is simply one JSX element that replaces another._

To embed an element, pass it as a prop just like any other - except an embed's prop name _must_ be:

- prepended by a single dollar symbol ($), and
- camel cased

```jsx
<Card $cardLink={(
  <Tooltip id="my-tooltip" title="My tooltip">
    <A href="#">My link</A>
  </Tooltip>
)}>
```

Similarly - using the `link` class - we can override all link elements while still leaning on their initial props:

```jsx
<Card $link={({ key, ...rest }) => (
  <Tooltip key={key} id={key} title={rest.children}>
    <A {...rest} />
  </Tooltip>
)}>
```

Or, we can even remove all links entirely:

```jsx
<Card $link={null}>
```

Voilà! No refactor required 😎

#### Embed props

To override element props only, simply pass a props object:

```jsx
<Card bg="primary" $link={{ color: 'white' }}>
```

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
