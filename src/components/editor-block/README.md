# Editor Block

Renders an Editor-Block containing specific meta data (eg. `title`) and the requested Editor Component (eg. Quill or another Editor Component).

## Example

```js
import { EditorBlock } from './'
import { EditorQuill } from './' // an example child component

// the content of the Editor-Block
const block = {
  id: 5,
  type: 'text',
  data: {
    value: 'Hello World.'
  },
  meta: {
    title: 'Editor-Block'
  }
}

<EditorBlock
  key={block.id}
  block={block}
  onClick={(event) => console.log('...on Click triggered', event)}
>
  <EditorQuill
    block={exampleBlock}
    onChange={(event) => console.log('...on onChange triggered', event)} // change contains the updated component data
  />
</EditorBlock>

```
