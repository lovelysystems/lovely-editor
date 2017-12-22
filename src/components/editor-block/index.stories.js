import React from 'react'
import { storiesOf } from '@storybook/react' //eslint-disable-line
import { action } from '@storybook/addon-actions' //eslint-disable-line
import withReadme from 'storybook-readme/with-readme' //eslint-disable-line

// Helpers
import { clone } from 'lodash'

// Component imports
import { EditorBlock, EditorImage } from '../..'
import componentReadme from './README.md'

// Example Config
const exampleBlock = {
  id: 5,
  data: {
    alignment: 'left',
    caption: 'Hello World.',
    size: 'medium',
    src: 'https://picsum.photos/480/240'
  },
  meta: {
    title: 'Input Box'
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
    const newState = clone(this.state.block)
    newState.data = change.data
    action('onChange')(change)
    this.setState({ block: exampleBlock })
  }

  render() {
    const { block } = this.state
    return (
      <EditorBlock
        block={block}
        onAction={action('onAction')}
      >
        <EditorImage
          block={block}
          onChange={this.onChange}
        />
      </EditorBlock>
    )
  }

}

storiesOf('Editor Components/Editor-Block', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => (
    <Wrapper />
  ))
