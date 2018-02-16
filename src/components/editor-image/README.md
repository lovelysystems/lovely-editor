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

## Customization

One can customize the `toolbar` component of the `EditorImage` component.
All that is needed is a property called `blockConfig`.

```js
props.blockConfig = {
  toolbar: CustomToolbar // custom Toolbar component
  toolbarCallback: () => {} // callback can be used to pass data from the CustomToolbar to the Wrapper
}
```

### Basic Customization Example Code

```js
import { EditorImage } from './'

const CustomToolbar = ({onToolbarClick}) => (
  <span>
    <button
      onClick={() => onToolbarClick('Toolbar clicked')}
    >
      Click me
    </button>
  </span>
)

const exampleBlock = {
  id: 5,
  data: {
    alignment: 'left',
    caption: 'Hello World.',
    size: 'medium',
    src: 'https://picsum.photos/480/240'
  },
  type: 'image'
}

const blockConfig = {
  toolbar: CustomToolbar,
  toolbarCallback: (props) => {
    // do something
  }
}

<EditorQuill
  block={exampleBlock}
  blockConfig={blockConfig}
  onChange={this.onChange}
/>

```

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
