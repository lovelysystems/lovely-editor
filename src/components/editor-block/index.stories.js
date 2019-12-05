import React from 'react'
import { storiesOf } from '@storybook/react' //eslint-disable-line
import { action } from '@storybook/addon-actions' //eslint-disable-line
import withReadme from 'storybook-readme/with-readme' //eslint-disable-line
import { clone } from 'lodash'

// Component imports
import { EditorBlock } from '../..'
import { EditorQuill } from '../editor-quill'

import componentReadme from './README.md'

// Example Config
const exampleBlock = {
  id: 5,
  type: 'richtext',
  data: {
    value: '',
  },
  meta: {
    title: 'Input Box',
  },
}

class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      block: exampleBlock,
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(change) {
    const { block } = this.state
    const newBlock = clone(block)
    newBlock.data = change.data
    action('onChange')(change)
    this.setState({ block: newBlock })
  }

  render() {
    const { block } = this.state
    return (
      <EditorBlock block={block} onAction={action('onAction')}>
        <EditorQuill block={block} onChange={this.onChange} />
      </EditorBlock>
    )
  }
}

storiesOf('Components/EditorBlock', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => <Wrapper />)
