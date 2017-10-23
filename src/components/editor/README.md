# Editor Component

The main component of this package. It renderes all the blocks and manages them.

## Example

```js

// the current content, can also be an empty array
const editorContent = [
  {
    id: 5,
    type: 'text',
    data: {
      value: 'This is the current Text.'
    },
    meta: {
      title: 'Input Block'
    }
  }, {
    id: 6,
    type: 'image',
    data: {
      value: 'https://media.giphy.com/media/brsEO1JayBVja/giphy.gif'
    },
    meta: {
      title: 'Image Block'
    }
  }
]

// renders a specific component for the given block type
const editorConfig = [
  {
    type: 'text',
    component: ExampleInput // React Component
  },
  {
    type: 'image',
    component: ExampleImage // React Component
  }
]

<Editor
  editorContent={editorContent}
  editorConfig={editorConfig}
  onChange={(change) => console.log(change)} // change contains the updated editorContent
/>

```
