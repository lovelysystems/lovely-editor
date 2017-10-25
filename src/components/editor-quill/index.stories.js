import React from 'react'
import { storiesOf } from '@storybook/react' //eslint-disable-line
import { action } from '@storybook/addon-actions' //eslint-disable-line
import withReadme from 'storybook-readme/with-readme' //eslint-disable-line

// Helpers
import { clone } from 'lodash'

// Component imports
import { EditorQuill } from '../..'
import componentReadme from './README.md'

class Wrapper extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      block: this.props.block //eslint-disable-line
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
    const { block } = this.state
    return (
      <EditorQuill
        block={block}
        onChange={this.onChange}
      />
    )
  }

}

storiesOf('Editors/Editor-Quill', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => {
    const exampleBlock = {
      id: 5,
      data: {
        value: ''
      },
      meta: {
        title: 'Input Box'
      }
    }
    return (
      <Wrapper block={exampleBlock}  />
    )
  })
  .add('with imported data', () => {
    const exampleBlock = {
      id: 5,
      data: {
        value: '<p>Nested List</p><ul><li>List1</li><li class="ql-indent-1">Nested List</li></ul><p><br></p><p>Hello World. <strong>This is bold.</strong></p>'
      },
      meta: {
        title: 'Input Box'
      }
    }
    return (
      <Wrapper block={exampleBlock}  />
    )
  })
  .add('with imported nested list', () => {
    const exampleBlock = {
      id: 5,
      data: {
        value: `<ul>
                  <li>Coffee</li>
                  <li>Tea
                    <ul>
                    <li>Black tea</li>
                    <li>Green tea</li>
                    </ul>
                  </li>
                  <li>Milk</li>
                </ul>`
      },
      meta: {
        title: 'Input Box'
      }
    }
    return (
      <Wrapper block={exampleBlock}  />
    )
  })
  .add('with all available formats', () => {
    const exampleBlock = {
      id: 5,
      data: {
        value: `
          <h1>H1</h1><h3>H2</h3><h3>H3</h3><p>Normal</p>
          <br>
          <p><strong>Bold</strong></p><p><em>Italic</em></p><p><u>Underlined</u></p>
          <br>
          <ul><li>List #1</li><li class="ql-indent-1">Listitem 1</li><li>List #2</li><li class="ql-indent-1">Listitem 1</li></ul>
          <br>
          <ol><li>List #1</li><li class="ql-indent-1">Listitem 2</li><li>List #2</li><li class="ql-indent-1">Listitem 1</li></ol>`
      },
      meta: {
        title: 'Input Box'
      }
    }
    return (
      <Wrapper block={exampleBlock}  />
    )
  })
