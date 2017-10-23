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
    return(
      <Wrapper block={exampleBlock}  />
    )
  })
  .add('with imported data', () => {
    const exampleBlock = {
      id: 5,
      data: {
        value: 'Nested List<br /><ul><li>List1</li><li><ul><li>Nested List</li></ul></li></ul><br /><p>Hello World. <b>This is bold.</b></p>'
      },
      meta: {
        title: 'Input Box'
      }
    }
    return(
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
    return(
      <Wrapper block={exampleBlock}  />
    )
  })
