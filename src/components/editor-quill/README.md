# Editor Quill

Renders the Quill Editor and returns its content on change.

## UI

### Toolbar

The Toolbar (see [Custom Toolbar Docu][1]) is handled by the Component itself but
  can be replaced by the User (see [Customization](#customize-toolbar)).

### Styling

The Editor Quill uses the `Snow` Theme (see more [here][2]).

#### Nested Ordered Lists
In order to display only numbers on each list-level of the order list, one has
to add the following code to the `styles.scss`:

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

## Customization

One can customize the `toolbar` component and other behavioural aspects of the
`EditorQuill` component. All that is needed is a new property called `additionalProps`.
Due to the setup of the <Editor /> component and logic this property has to be an array
and has to include an object that looks like:

```js
props.additionalProps = [{
  type: 'richtext' // << must be the same as the props.block.type
  data: {
    ... // see list of data properties below
  }
}]

props.block = {
  ...,
  type: 'richtext' // << must match with the type above
}
```

The following data propertiers are allowed and can be used:

- `toolbar`: custom Toolbar component
- `toolbarCallback`: this callback allows the developer to use a callback to get data from the
   custom Toolbar to the EditorWrapper (eg. onClick on a custom button in the custom
     Toolbar)
- `toolbarSelector`: css selector of the new Toolbar component (tells Quill to use it)
- `hideToolbarOnBlur`: hide the toolbar, once the Editor looses focus (onBlur)

### Basic Customization Example Code

```js
import { EditorQuill } from './'

const exampleBlock = {
  id: 5,
  data: {
    value: '<p>Hello World. <b>This is bold.</b></p>'
  },
  meta: {
    title: 'Input Box'
  },
  type: 'richtext'
}

const additionalProps = [{
  type: 'richtext',
  data: {
    hideToolbarOnBlur: true
  }
}]

<EditorQuill
  additionalProps={additionalProps}
  block={exampleBlock}
  onChange={this.onChange}
/>

```

### Customize Toolbar

Usually the Toolbar is handled by the Component itself, but the User can decide
to overwrite it and render a custom one instead.

Attention: One needs to take care of applying the [correct classNames (eg. ql-bold)][7]
for buttons, selects and other action items in the custom Toolbar. Only then will
Quill recognize them  as such.

The current implementation level of the customization allows only to replace
the UI basically, but no deep integration in custom Toolbar actions are available (eg.
  custom formatting). One can add additional buttons (eg. Close-Button for the Block)
  which are not related to the Editor per se.

#### Toolbar Example Code

```js
import { EditorQuill } from './'

const customQuillToolbar = (props) => {
  const onClick = () => {
    props.onToolbarClick('customQuillToolbar >> Toolbar clicked')
  }

  return (
    <div className="ql-toolbar" id="customToolbar" >
      <select className="ql-header" defaultValue="">
        <option value="1" />
        <option value="2" />
        <option value="3" />
        <option value="" />
      </select>
      <button onClick={onClick}>Click Me</button>
    </div>
  )
}

class Wrapper extends React.Component {

  onToolbarAction(toolbarAction) {
    // do something...
  }

  render() {
    const const exampleBlock = {
      id: 5,
      data: {
        value: '<p>Hello World. <b>This is bold.</b></p>'
      },
      meta: {
        title: 'Input Box'
      },
      type: 'richtext'
    }
    const additionalProps = [{
      type: 'richtext',
      data: {
        toolbar: customQuillToolbar,
        toolbarCallback: this.onToolbarAction,
        toolbarSelector: '#customToolbar'
      }
    }]

    return (
      <EditorQuill
        additionalProps={additionalProps}
        block={exampleBlock}
        onChange={this.onChange}
      />
    )
  }  
}

```

## Data Handling and Performance

### Data Imports

The Quill component can import html content (eg. `<p><b>Hello World</b></p>`).
Quill is able to import a [delta][3], html or plain text.

### Copy & Paste

- **Word**
  - (Basic) Copy & Paste Support
  - not all Word-Styles can be imported and processed by Quill
- **Pages**
  - (Basic) Copy & Paste Support
  - Some Headings-Formates (like Title, Headings) are not processed as such.
  They are imported as bold text.
- **PDF**
  - (Basic) Copy & Paste Support
  - Some Headings-Formates (like Title, Headings) are not processed as such.
  They are imported as bold text.

Images are not supported by now and stripped away by not allowing the `images`
format. Read more [here][4].

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

### Performance

The Component emits changes to the Editor with the Help of Lodash's
[`debounce`][5] feature. Lodash creates a debounced function that delays
invoking `onChange` until after `wait` milliseconds have elapsed since the last
time the debounced function was invoked. Currently this is set to 300ms. We wait
for max 1000ms before the delayed `onChange` is invoked.

## Known Issues

- React-Quill (1.1.0) and Android: One cannot add new empty lines to an Editor
with existing content, when the last chars have `strong` styling. Additionally,
the cursor jumps to a new line, when there is more content after
`<strong>`-paragraph.
  - Issue Reports: [React-Quill][6]

## Example Code

```js
import { EditorQuill } from './'

const exampleBlock = {
  id: 5,
  data: {
    value: '<p>Hello World. <b>This is bold.</b></p>'
  },
  meta: {
    title: 'Input Box'
  },
  type: 'richtext'
}

<EditorQuill
  block={exampleBlock}
  onChange={this.onChange}
/>

```

[1]: https://github.com/zenoamaro/react-quill#custom-toolbar
[2]: http://quilljs.com/docs/themes/#snow
[3]: https://github.com/zenoamaro/react-quill#using-deltas
[4]: https://github.com/quilljs/quill/issues/1108
[5]: https://lodash.com/docs/4.17.4#debounce
[6]: https://github.com/zenoamaro/react-quill/issues/282
[7]: http://quilljs.com/standalone/full/
