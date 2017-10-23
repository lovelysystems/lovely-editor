# Editor Block

Renders an Editor-Block containing specific meta data (eg. `title`) and the requested Editor Component (eg. Quill or another Editor Component).

## Example

```js

// the content of the Editor-Block
const editorContent = [
  {
    id: 5,
    type: 'text',
    data: {
      value: 'Hello World.'
    },
    meta: {
      title: 'Editor-Block'
    }
  }
]

<EditorBlock
  key={editorContent.id}
  block={editorContent}
>
  <Component
    block={editorContent}
    onChange={(change) => console.log(change)} // change contains the updated component data
  /> // the actual editor (eg. Quill)
</EditorBlock>

```