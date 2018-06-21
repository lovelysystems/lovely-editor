# EditorBlock

Renders an EditorBlock containing specific meta data (eg. `title`) and the
requested Editor Component (eg. EditorQuill or another Editor Component).

## Example

```js
import { EditorBlock } from './'
import { EditorQuill } from './' // an example child component

// the content of the EditorBlock
const block = {
  id: 5,
  type: 'text',
  data: {
    value: 'Hello World.'
  },
  meta: {
    title: 'EditorBlock'
  }
}

const style = {
  border: '1px solid #000000'
}

<EditorBlock
  key={block.id}
  block={block}
  onClick={(event) => console.log('...on Click triggered', event)}
  style={style}
>
  <EditorQuill
    block={exampleBlock}
    onChange={(event) => console.log('...on onChange triggered', event)} // change contains the updated component data
  />
</EditorBlock>

```
