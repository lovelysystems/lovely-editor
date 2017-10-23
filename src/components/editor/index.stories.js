import React from 'react'
import { storiesOf } from '@storybook/react' //eslint-disable-line
import { action } from '@storybook/addon-actions' //eslint-disable-line
import withReadme from 'storybook-readme/with-readme' //eslint-disable-line

// Helpers
import { BemHelper } from '../../helpers/bem-helper'
import { EditorState } from '../../model/editor-state'

// Component imports
import { Editor, EditorQuill, ExampleMenu, ExampleInput, ExampleImage } from '../..'
import componentReadme from './README.md'

// Styling
const classes = new BemHelper('editor')

// Story Setup
const menuState = {
  meta: {
    title: 'Example-Menu'
  }
}
const blocksConfig = [
  {
    type: 'text',
    component: ExampleInput
  },
  {
    type: 'image',
    component: ExampleImage
  },
  {
    type: 'richtext',
    component: EditorQuill
  }
]
const basicEditorState = [{
  id: 7,
  type: 'richtext',
  data: {
    value: 'Nested List<br /><ul><li>List1</li><li><ul><li>Nested List</li></ul></li></ul><br /><p>Hello World. <b>This is bold.</b></p>'
  },
  meta: {
    title: 'Quill Block'
  }
}]


class Wrapper extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.onChange = this.onChange.bind(this)
    this.state = {
      editorState: this.props.editorState // eslint-disable-line
    }

    // bindings
    this.onChange = this.onChange.bind(this)
    this.onMenuClick = this.onMenuClick.bind(this)
  }

  // event listeners
  onChange(change) {
    action('onChange')(change)
    this.setState({ editorState: change.editorState })
  }
  onMenuClick(event) {
    const { editorState } = this.state
    action('onMenuClick')(event)

    let newBlock = null
    switch (event.type) {
    case 'text':
      newBlock = {
        id: Math.floor((Math.random() * 1000) + 1),
        type: 'text',
        data: {
          value: 'This is the current Text.'
        },
        meta: {
          title: 'Input Block'
        }
      }
      break
    case 'image':
      newBlock = {
        id: Math.floor((Math.random() * 1000) + 1),
        type: 'image',
        data: {
          value: 'https://media.giphy.com/media/brsEO1JayBVja/giphy.gif'
        },
        meta: {
          title: 'Image Block'
        }
      }
      break
    case 'richtext':
      newBlock = {
        id: Math.floor((Math.random() * 1000) + 1),
        type: 'richtext',
        data: {
          value: ''
        },
        meta: {
          title: 'Quill Block'
        }
      }
      break
    default:
      break
    }

    if (!!newBlock) {
      this.setState({ editorState: EditorState.appendBlock(editorState, newBlock) })
    }
  }

  render() {
    const { editorState } = this.state
    const { menuState, blocksConfig } = this.props // eslint-disable-line

    return (
      <div {...classes('container')}>
        <ExampleMenu
          menuState={menuState}
          onClick={(event) => this.onMenuClick(event)}
        />
        <Editor
          editorState={editorState}
          blocksConfig={blocksConfig}
          onChange={this.onChange}
        />
      </div>
    )
  }

}

storiesOf('App/Editor', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => {
    return (
      <Wrapper
        editorState={basicEditorState}
        blocksConfig={blocksConfig}
        menuState={menuState}
      />
    )
  })
  .add('with multiple Example Blocks', () => {
    const additionalContent = [
      ...basicEditorState,
      {
        id: 5,
        type: 'text',
        data: {
          value: 'This is the current Text.'
        },
        meta: {
          title: 'Input Block'
        }
      }, {
        id: 6,
        type: 'image',
        data: {
          value: 'https://media.giphy.com/media/brsEO1JayBVja/giphy.gif'
        },
        meta: {
          title: 'Image Block'
        }
      }
    ]

    return (
      <Wrapper
        editorState={additionalContent}
        blocksConfig={blocksConfig}
        menuState={menuState}
      />
    )
  })
