import React from 'react'
import { storiesOf } from '@storybook/react' //eslint-disable-line
import { action } from '@storybook/addon-actions' //eslint-disable-line
import withReadme from 'storybook-readme/with-readme' //eslint-disable-line

// Component imports
import { Editor, ExampleInput, ExampleImage } from '../..'
import componentReadme from './README.md'

// Example Configs
const currentEditorContent = [
  {
    id: 5,
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
  }
]
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

class Wrapper extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.onChange = this.onChange.bind(this)
    this.state = {
      editorContent: currentEditorContent
    }
  }

  onChange(change) {
    action('onChange')(change)
    this.setState({ editorContent: change.editorContent })
  }

  render() {
    const { editorContent } = this.state
    return (
      <Editor
        editorContent={editorContent}
        editorConfig={editorConfig}
        onChange={this.onChange}
      />
    )
  }

}

storiesOf('Editor/Editor', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => (
    <Wrapper />
  ))
