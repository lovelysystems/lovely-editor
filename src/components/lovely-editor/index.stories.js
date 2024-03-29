import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import withReadme from 'storybook-readme/with-readme'

import { LovelyEditor } from '../..'
import { EditorQuill } from '../editor-quill'
import componentReadme from './README.md'

// default content of the <LovelyEditor />
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
      <LovelyEditor
        blocksConfig={blocksConfig}
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
    )
  }

}

storiesOf('Components/LovelyEditor', module)
  .addDecorator(withReadme(componentReadme))
  .add('default (uncontrolled)', () => {
    const onChange = (change) => {
      action('onChange')(change)
    }

    return (
      <LovelyEditor
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
