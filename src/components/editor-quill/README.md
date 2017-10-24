# Editor Quill

Renders the Quill Editor and returns its content on change.

## UI

### Toolbar

The Toolbar (see [Custom Toolbar Docu](https://github.com/zenoamaro/react-quill#custom-toolbar)) is handled by the Component itself and currently not be modified from the User (via props). Additionally, if the Editor looses focus (`onBlur`) we hide the Toolbar currently (see `onMouseDown` in the `QuillToolbar` Component). This works on iOS, Android and IE 11 right now.

### Styling

The Editor Quill uses the `Snow` Theme (see more [here](http://quilljs.com/docs/themes/#snow)).

#### Nested Ordered Lists
In order to display only numbers on each list-level of the order list, one has to add the following code to the `styles.scss`:

```scss
.ql-editor ol {
  @for $i from 1 through 8 {
    li.ql-indent-#{$i} {
      &:before {
        content: counter(list-#{$i}, decimal) '.' // eg. 1. instead of a.
      }
    }
  }
}
```

## Data Handling and Performance

### Performance

The Component emits changes to the Editor with the Help of Lodash's [`debounce`](https://lodash.com/docs/4.17.4#debounce) feature. Lodash creates a debounced function that delays invoking `onChange` until after `wait` milliseconds have elapsed since the last time the debounced function was invoked. Currently this is set to 300ms. We wait for max 1000ms before the delayed `onChange` is invoked.

### Data Imports

The Quill component can import html content (eg. `<p><b>Hello World</b></p>`). Quill is able to import a [delta](https://github.com/zenoamaro/react-quill#using-deltas), html or plain text.

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
