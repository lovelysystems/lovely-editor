import * as React from 'react'
import { render } from 'react-dom'

// Editor and Editor Components
import { Editor, ExampleInput, ExampleImage } from '../src'

// Helpers
import { BemHelper } from '../src/helpers/bem-helper'

// Styles
require('./sass/main.scss')

const classes = new BemHelper('example-app')

// current Value
const currentEditorContent = [{
  id: 5, // TODO: define who is responsible for creating this id; and use it in the Editor
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
}]

// current EditorConfig
const editorConfig = [
  {
    type: 'text',
    component: ExampleInput
  },
  {
    type: 'image',
    component: ExampleImage
  }
]

// Main App
export class ExampleApp extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.onChange = this.onChange.bind(this)
    this.state = {
      editorContent: currentEditorContent
    }
  }

  onChange(change) {
    this.setState({ editorContent: change.editorContent })
  }

  render() {
    const { editorContent } = this.state
    return (
      <div {...classes('container')}>
        <Editor
          editorContent={editorContent}
          editorConfig={editorConfig}
          onChange={this.onChange}
        />
      </div>
    )
  }

}

// Render ExampleApp
const ROOT_NODE = document.querySelector('#app')
render(<ExampleApp />, ROOT_NODE)
