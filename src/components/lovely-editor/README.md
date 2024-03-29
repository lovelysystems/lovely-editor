# LovelyEditor Component

The main component of this package. It renderes all the blocks and manages them.

## Properties

* `additionalProps` (object): contains additional data which is passed to each level
  (eg. LovelyEditor -> EditorBlock -> EditorQuill). It can contain any data a component might need additionally
  (eg. your customized EditorBlock).
* `blockComponent` (component): optional, allows to wrap blocks in a custom wrapper
* `blocksConfig` (array): maps a `type` to a component or render function and contains customization `data`
* `editorState` (array): represents the current state of the Editor
* `onChange` (func): emits changes of the editor
* `placeholder` (component): renders a placeholder component when the `editorState` is empty
* `style` (object): custom styles for the component

### Property Structures

#### editorState

The `editorState` is an array that must look like this (when not empty):

```js
const editorState = [{
  id: 1, // UNIQUE id of the block
  type: 'text', // type of the block, for each type there must be a matching blocksConfig
  data: { // data for the component. Can have additionaly properties, depends on the used component
    value: 'This is the current Text.' // the content of a component (eg. of the EditorQuill), recommended name
  },
  meta: { // meta information for the Block-Wrapper
    title: 'Input Block'
  }
}]
```

**Attention**: the block.id must be unique! Make sure each block has it's own
individual (it can be random though) id. The id is used to identify each block
with the LovelyEditor.

#### blockComponent

The `blockComponent` property is optional and must be a React Component. It will be
used to wrap the `<EditorBlock/>` component in a custom component. This can be very
useful if a DragAndDrop feature is planned. An example use case can be found in
the storybook (look for the example with Drag and Drop).

```js
import { EditorBlock } from '../editor-block'

// Example Implementation, which renders the default Component with no additional feature
const customBlockWrapper = ({block, children, onAction}) => (
  <EditorBlock
    key={block.id}
    block={block}
    onAction={onAction}
  >
    { children }
  </EditorBlock>
)

// then pass customBlockWrapper as blockComponent to the LovelyEditor
<LovelyEditor
  editorState={...}
  blockComponent={customBlockWrapper}
  blocksConfig={...}
  onChange={...}
/>
```

#### blocksConfig

The `blocksConfig` is an array that must look like this, and contain a
type-definition for each block in the `editorState`:

```js
const blocksConfig = [{
  type: 'text', // block-type, for each type in the editorState there must be a definition here
  component: EditorQuill // eg. React Component or render function
  blockConfig: { // used and passed as blockConfig to the <EditorBlock /> and editors (eg. <EditorQuill />)
    someCustomData: 'someCustomValue'
  }
}]
```

Other components of the LovelyEditor (eg. EditorQuill) will use the properties from `blockConfig`
to customize their behaviour (eg. use a custom toolbar).

#### onChange

The `onChange` property emits every change that happens inside the LovelyEditor. It
can look like this:

```js
onChange(change) {
  console.log('onChange triggered:', change)
}
```

The `change` parameter will have a structure like this:

```js
change = {
  editorState: [] // the new editorState with the changes
  block: {} // the updated block with the changed data
}
```


## Example

```js
import { LovelyEditor } from './'

// the current content, can also be an empty array
const editorState = [
  {
    id: 1,
    type: 'text',
    data: {
      value: 'This is the current Text.'
    },
    meta: {
      title: 'Input Block'
    }
  }
]

renderImage = (props) => {
  return <ExampleImage {...props} filter='grayscale'/>
}

// renders a specific component for the requested block type
const blocksConfig = [
  {
    type: 'text',
    component: RichText // eg. React Component
  },
  {
    type: 'image',
    component: renderImage // eg. function, which wraps the requested component
  }
]

<LovelyEditor
  editorState={editorState}
  blocksConfig={blocksConfig}
  onChange={(change) => console.log(change)}
/>

```
