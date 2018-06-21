import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import withReadme from 'storybook-readme/with-readme'

import { OyezEditor, EditorQuill } from '../..'
import componentReadme from './README.md'

// default content of the <OyezEditor />
const editorState = [{
  id: 7,
  type: 'richtext',
  data: {
    value: '<p>Hello World. <strong>This is bold.</strong></p>'
  },
  meta: {
    title: 'Quill Block'
  }
}]

// renders a specific component for the requested block type
const blocksConfig = [
  {
    type: 'richtext',
    component: EditorQuill
  },
]

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      editorState
    }
  }

  onChange = (change) => {
    action('onChange')(change)
    this.setState({editorState: change.editorState})
  }

  render() {
    return (
      <OyezEditor
        blocksConfig={blocksConfig}
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
    )
  }

}

storiesOf('Components/OyezEditor', module)
  .addDecorator(withReadme(componentReadme))
  .add('default (uncontrolled)', () => {
    const onChange = (change) => {
      action('onChange')(change)
    }

    return (
      <OyezEditor
        blocksConfig={blocksConfig}
        editorState={editorState}
        onChange={onChange}
      />
    )
  })
  .add('default (controlled)', () => {
    return (
      <App />
    )
  })
