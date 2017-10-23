import React from 'react'
import { storiesOf } from '@storybook/react' //eslint-disable-line
import { action } from '@storybook/addon-actions' //eslint-disable-line
import withReadme from 'storybook-readme/with-readme' //eslint-disable-line

// Component imports
import { EditorQuill } from '../..'
import componentReadme from './README.md'

// Example Config
const exampleBlock = {
  id: 5,
  data: {
    value: 'Hello World.'
  },
  meta: {
    titel: 'Input Box'
  }
}

class Wrapper extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      block: exampleBlock
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(change) {
    exampleBlock.data = change.data
    action('onChange')(change)
    this.setState({ block: exampleBlock })
  }

  render() {
    return (
      <EditorQuill />
    )
  }

}

storiesOf('Editors/Editor-Quill', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => (
    <Wrapper />
  ))
