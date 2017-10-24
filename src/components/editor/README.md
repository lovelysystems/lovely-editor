# Editor Component

The main component of this package. It renderes all the blocks and manages them.

## Properties

* `editorState`: represents the current state of the Editor
* `blocksConfig`: maps `type` to a component or render function
* `onChange`: emits changes of the editor

## Example

```js
import { Editor } from './'

// the current content, can also be an empty array
const editorState = [
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

renderImage = (props) => {
  return <ExampleImage {...props} filter='grayscale'/>
}

// renders a specific component for the given block type
const blocksConfig = [
  {
    type: 'text',
    component: ExampleInput // eg. React Component
  },
  {
    type: 'image',
    component: renderImage // eg. function, which wraps the requested component
  }
]

<Editor
  editorState={editorState}
  blocksConfig={blocksConfig}
  onChange={(change) => console.log(change)}
/>

```
