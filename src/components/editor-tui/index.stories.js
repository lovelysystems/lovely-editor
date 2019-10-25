import React from 'react'
import { clone } from 'lodash'
import { storiesOf } from '@storybook/react' //eslint-disable-line
import { action } from '@storybook/addon-actions' //eslint-disable-line
import withReadme from 'storybook-readme/with-readme' //eslint-disable-line
import componentReadme from './README.md'

import { EditorTui } from '.'

const defaultBlockConfig = {
  initialEditType: 'markdown', // possible: "markdown" | "wysiwyg"
  previewStyle: 'vertical', // possible: "tab" | "vertical"
  height: '400px',
}

const defaultBlock = {
  data: {
    value: '# Hello World',
  },
}

class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      block: defaultBlock,
      blockConfig: defaultBlockConfig,
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(change) {
    const { block } = this.state

    const newState = clone(block)
    newState.data = change.data
    action('onChange')(change)
    this.setState({ block: newState })
  }

  render() {
    const { block, blockConfig } = this.state

    return (
      <EditorTui
        block={block}
        blockConfig={blockConfig}
        onChange={this.onChange}
      />
    )
  }
}

storiesOf('Editors/EditorTui', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => <Wrapper />)
