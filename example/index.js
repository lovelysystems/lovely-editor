import * as React from 'react'
import { render } from 'react-dom'

// Editor Components
import Editor from '../src/components/editor'

// Editors
import ExampleInput from '../src/components/example-input'
import ExampleImage from '../src/components/example-image'

// Helpers
import { BemHelper } from '../src/helpers/bem-helper'

// Styles
require('../sass/main.scss')

const classes = new BemHelper('example-app')

// current Value
const currentEditorContent = [{
  id: 5, // TODO: define who is responsible for creating this id
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
export default class ExampleApp extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.onChange = this.onChange.bind(this)
    this.state = {
      editorContent: currentEditorContent
    }
  }

  onChange(newState, delta) {
    this.setState({ editorContent: newState })
  }

  render() {
    const { editorContent } = this.state
    return (
      <div {...classes('app')}>
        <Editor
          editorContent={editorContent}
          editorConfig={editorConfig}
          onChange={this.onChange}
        />
      </div>
    )
  }

}

// Render EditorApp
const ROOT_NODE = document.querySelector('#app')
render(<ExampleApp />, ROOT_NODE)
