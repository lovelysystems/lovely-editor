import React from 'react'
import { storiesOf } from '@storybook/react' //eslint-disable-line
import { action } from '@storybook/addon-actions' //eslint-disable-line
import withReadme from 'storybook-readme/with-readme' //eslint-disable-line

// Component imports
import { EditorImage } from './'
import componentReadme from './README.md'

// Example Config
const exampleConfig = {
  id: 5,
  data: {
    alignment: 'left',
    caption: 'Hello World.',
    size: 'medium',
    src: 'https://picsum.photos/480/240'
  }
}

class Wrapper extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      block: exampleConfig
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(change) {
    exampleConfig.data = change.data
    action('onChange')(change)
    this.setState({ block: exampleConfig })
  }

  render() {
    return (
      <EditorImage
        block={this.state.block}
        onChange={this.onChange}
      />
    )
  }

}

storiesOf('Editor Components/Image', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => (
    <Wrapper />
  ))
