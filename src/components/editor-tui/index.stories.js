import React from 'react'
import { clone } from 'lodash'
import { storiesOf } from '@storybook/react' //eslint-disable-line
import { action } from '@storybook/addon-actions' //eslint-disable-line
import withReadme from 'storybook-readme/with-readme' //eslint-disable-line
import componentReadme from './README.md'

import { EditorTui } from './'

const blockConfig = {
  initialEditType: 'markdown', // possible: "markdown" | "wysiwyg"
  previewStyle: 'vertical', // possible: "tab" | "vertical"
  height: '400px'
}

const block = {
  data: {
    value: '# Hello World'
  },
}

class Wrapper extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      block,
      blockConfig
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(change) {
    const newState = clone(this.state.block)
    newState.data = change.data
    action('onChange')(change)
    this.setState({ block: newState })
  }

  render() {
    return (
      <EditorTui
        block={this.state.block}
        blockConfig={this.state.blockConfig}
        onChange={(change) => this.onChange(change)}
      />
    )
  }

}

storiesOf('Editors/EditorTui', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => (
    <Wrapper />
  ))
