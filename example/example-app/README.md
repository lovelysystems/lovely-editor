# App Example

These App Example stories will provide some illustrations on how to use and
include the LovelyEditor in your application.

## App Example Stories Overview

The example app can be found [in our storybook](https://lovely-editor.netlify.com/).
Each story contains an `ExampleApp`, `ExampleMenu` (part of your app) and the
`LovelyEditor`.

The `ExampleMenu` would be part of your application and allows users to add new
Editors to `LovelyEditor` in our examples. And the `ExampleApp` is responsible for
handling the `editorState` (contains all blocks and their content of the
LovelyEditor). Handling means it must subscribe to the `LovelyEditor`'s `onChange`,
get the change, update the old `editorState` (usually part of the state of
ExampleApp) and give it back to the `LovelyEditor` as a property. A simple
example would look like this:

```js
import { LovelyEditor } from 'lovely-editor'

// current state of LovelyEditor
const editorState = [
  {
    id: 1, // must be unique for each block in the state
    type: 'richtext',
    data: {
      value: '<p>Hello World. <strong>This is bold.</strong></p>'
    },
    meta: {
      title: 'Quill Editor'
    }
  },
]

// sets which editor component should be rendered for which block.type
// in this case EditorQuill would be rendered for all blocks of type "richtext"
const blocksConfig = [{
  type: 'richtext',
  component: EditorQuill
}]

class YourApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(change) {
    this.setState({editorState: change.editorState});
  }

  render() {
    return (
      <LovelyEditor
        blocksConfig={blocksConfig}
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
    )
  }
}
```

## Additional Details for Content and Customization stories

In the example you will find two additional chapters: Content and Customization.
They both show in more detail how you get the HTML output of all Editors or
how you can customize LovelyEditor and eg. add Drag and Drop Support.

### Content Story

To get or generate HTML from the content of all Editors one has to iterate over
the block.data objects. Some Editors already provide HTML (eg. EditorQuill or
EditorTui) and others don't (eg. our EditorImage example). Then you need to take
care of generating the HTML tag yourself. Check out our example `html-preview.js`
to see it in action.

### Customization

What if you do not want to use our default `EditorBlock` but want to add your own?
What if you need to support DnD, as we do in one of our example stories? The answer
is: you have to create your own `EditorBlock` component and tell the `LovelyEditor`
to use yours instead of the default one by adding it as the `blockComponent`
property.

You can take a look at `block-wrapper.js` to see it in action. In the example we
created an `ExampleBlockWrapper` that wraps the default `EditorBlock` to add
DnD capabilities. You could also replace the entire `EditorBlock` with your own
and just render it's `children` (which is the Editor of the block, eg. `EditorQuill`).

### Templates

Your app could also add default values to the Editors when the user adds new ones.
in our example the `ExampleMenu` has template buttons. When one of them is clicked,
`ExampleApp` selects then the corresponding template in the list of templates and
adds it as the default value to the new Editor.

## Example Story Setup (Storybook)

* `index.stories.js` => sets the structure of the storybook and what components
  to render in a story

```js
storiesOf('App Example', module)
  .addDecorator(withReadme(componentReadme))
  .add('Menu and Quill Block Editor', () => {
    return (
      <App
        document={defaultDocument}
        blocksConfig={defaultBlocksConfig}
        menuState={defaultMenuState}
      />
    )
  })
  .add(...
```
