import React from 'react'
import { storiesOf } from '@storybook/react' //eslint-disable-line
import { action } from '@storybook/addon-actions' //eslint-disable-line
import withReadme from 'storybook-readme/with-readme' //eslint-disable-line

// Component imports
import { EditorImage } from './'
import componentReadme from './README.md'

const CustomToolbar = ({onToolbarClick}) => (
  <span>
    <button
      onClick={() => onToolbarClick('Toolbar clicked')}
    >
      Click me
    </button>
  </span>
)

const CustomEditor = props => <span>custom editor</span>

// Example Config
const exampleBlock = {
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
    const blockConfig = {
      editor: this.props.editor,
      toolbar: this.props.toolbar,
      toolbarCallback: (data) => {
        action('onToolbarClick')(data)
      }
    }

    return (
      <EditorImage
        block={this.state.block}
        blockConfig={blockConfig}
        onChange={this.onChange}
      />
    )
  }

}

storiesOf('Editors/Editor Image', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => (
    <Wrapper />
  ))
  .add('with custom Toolbar', () => (
    <Wrapper toolbar={CustomToolbar} />
  ))
  .add('with custom Editor', () => (
    <Wrapper editor={CustomEditor} />
  ))
