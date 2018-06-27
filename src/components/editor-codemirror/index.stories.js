import React from 'react'
import { clone } from 'lodash'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import withReadme from 'storybook-readme/with-readme'
import componentReadme from './README.md'

import { EditorCodeMirror } from './index'

const blocksConfig = {
  // lineNumbers ==> needs to be false, otherwise storybook cannot handle
  // mounting/rendering it correctly (but works in other envs)
  lineNumbers: false
}

const block = {
  data: {
    value: 'function helloWorld() {\n\tconsole.log(\'hello world\');\n}\nhelloWorld();'
  }
}

class Wrapper extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      block,
      blocksConfig
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
      <EditorCodeMirror
        block={this.state.block}
        blocksConfig={this.state.blocksConfig}
        onChange={(change) => this.onChange(change)}
      />
    )
  }

}

storiesOf('Editors/EditorCodeMirror', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => (
    <Wrapper />
  ))
