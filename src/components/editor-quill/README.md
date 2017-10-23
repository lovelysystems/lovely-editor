# Editor Quill

Renders a Quill Editor and returns its content on change.

## UI

### Navigation

The Navigation Bar is handled by the Component itself and currently not be modified from the User (via props).

### Styling

The Editor Quill uses the `Snow` Theme (see more [here](http://quilljs.com/docs/themes/#snow)).

## Data Handling

### Data Imports

The Quill component can import html content (eg. `<p><b>Hello World</b></p>`).

### Nested Lists

Quill handles nested lists differently. Imaging you import a list like this one:

```html
<ul>
  <li>Coffee</li>
  <li>Tea
    <ul>
    <li>Black tea</li>
    <li>Green tea</li>
    </ul>
  </li>
  <li>Milk</li>
</ul>
```

Quill will import and handle it further on like this:

```html
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li class="ql-indent-1">Black tea</li>
  <li class="ql-indent-1">Green tea</li>
  <li>Milk </li>
</ul>
```

## Example

```js

import { EditorQuill } from './'

const exampleBlock = {
  id: 5,
  data: {
    value: '<p>Hello World. <b>This is bold.</b></p>'
  },
  meta: {
    title: 'Input Box'
  }
}

<EditorQuill
  block={exampleBlock}
  onChange={this.onChange}
/>

```
