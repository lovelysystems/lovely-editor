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

// Example Configs
const currentEditorState = [
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
  }, {
    id: 7,
    type: 'richtext',
    data: {
      value: 'Hello World'
    },
    meta: {
      title: 'Quill Block'
    }
  }
]

class Wrapper extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.onChange = this.onChange.bind(this)
    this.state = {
      editorState: currentEditorState
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
    default:
      break
    }

    if (!!newBlock) {
      this.setState({ editorState: EditorState.appendBlock(editorState, newBlock) })
    }
  }

  renderImage = (props) => {
    return <ExampleImage {...props} />
  }

  renderQuill = (props) => {
    return <EditorQuill {...props} />
  }

  render() {
    const { editorState } = this.state
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
        component: this.renderImage
      },
      {
        type: 'richtext',
        component: this.renderQuill
      }
    ]

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

storiesOf('Editor/Editor', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => (
    <Wrapper />
  ))
