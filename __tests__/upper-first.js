import { upperFirst } from '../src/util'

test('first letter is capitalised', () => {
  expect(upperFirst('clipPath')).toEqual('ClipPath')
  expect(upperFirst('div')).toEqual('Div')
  expect(upperFirst('h1')).toEqual('H1')
  expect(upperFirst('SVG')).toEqual('SVG')
})
