## Editor Image

Renders an Image block, which is capable of

- modify caption
- choose alignment (left, center, right)
- choose image size (small, medium, full-width)

## Data Structure

```js
  data: {
    alignment: 'left',
    caption: 'Hello World.',
    size: 'medium',
    src: 'https://picsum.photos/480/240'
  }
```

All properties are required.

## Example Code

```js
import { EditorImage } from './'

const exampleImage = {
  data: {
    alignment: 'left',
    caption: 'Hello World.',
    size: 'medium',
    src: 'https://picsum.photos/480/240'
  }
}

<EditorImage
  block={exampleImage}
  onChange={(change) => { console.log('...onChange triggered', change); }}
/>

```
