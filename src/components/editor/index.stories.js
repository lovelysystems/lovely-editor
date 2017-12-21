import React from 'react'
import { storiesOf } from '@storybook/react' //eslint-disable-line
import { action } from '@storybook/addon-actions' //eslint-disable-line
import withReadme from 'storybook-readme/with-readme' //eslint-disable-line

// DND Example: https://github.com/alexreardon/react-beautiful-dnd-flow-example/blob/master/src/App.js
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

// Helpers
import { BemHelper } from '../../helpers/bem-helper'
import { EditorState } from '../../model/editor-state'

// Component imports
import { ExampleMenu } from '../example-menu'
import { Editor, EditorQuill, EditorImage } from '../..'
import componentReadme from './README.md'

// Styling
const classes = new BemHelper('example-app')

// Story Setup
const menuState = {
  meta: {
    title: 'Example-Menu'
  }
}
const blocksConfig = [
  {
    type: 'richtext',
    component: EditorQuill
  },
  {
    type: 'image',
    component: EditorImage
  }
]
const basicEditorState = [{
  id: 7,
  type: 'richtext',
  data: {
    value: '<p>Nested List</p><ul><li>List1</li><li class="ql-indent-1">Nested List</li></ul><p><br></p><p>Hello World. <strong>This is bold.</strong></p>'
  },
  meta: {
    title: 'Quill Block'
  }
}]

const reorder = (editorState, startIndex, endIndex) => {
  // see example: https://github.com/alexreardon/react-beautiful-dnd-flow-example/blob/master/src/App.js#L30
  const result = Array.from(editorState)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

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
          alignment: 'center',
          caption: 'Hello Kevin.',
          size: 'medium',
          src: 'https://media.giphy.com/media/brsEO1JayBVja/giphy.gif'
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

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    let newEditorState = this.state.editorState
    if (!result.source.droppableId.includes('droppable-menu')) {
      // only reorder elements when the element was not added from the menu
      newEditorState = reorder(
        this.state.editorState,
        result.source.index,
        result.destination.index
      )
    }

    this.setState({
      editorState: newEditorState
    })
  }

  render() {
    const { editorState } = this.state
    const { menuState, blocksConfig } = this.props // eslint-disable-line

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div {...classes('container')} >
          <Droppable droppableId='droppable-menu' isDropDisabled direction='horizontal'>
            {(dropProvided, snapshot) => (
              <div {...classes('menu')} ref={dropProvided.innerRef} data-dragging={snapshot.isDraggingOver}>
                <ExampleMenu
                  menuState={menuState}
                  onClick={(event) => this.onMenuClick(event)}
                />
              </div>
            )}
          </Droppable>
          <div {...classes('editor')} >
            <Droppable droppableId='droppable-editor'>
              {(dropProvided, snapshot) => (
                <div ref={dropProvided.innerRef} data-dragging={snapshot.isDraggingOver}>
                  <Editor
                    editorState={editorState}
                    blocksConfig={blocksConfig}
                    onChange={this.onChange}
                  />
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    )
  }

}

storiesOf('App/Editor', module)
  .addDecorator(withReadme(componentReadme))
  .add('default Editor', () => {
    return (
      <Wrapper
        editorState={basicEditorState}
        blocksConfig={blocksConfig}
        menuState={menuState}
      />
    )
  })
  .add('Editor with multiple Example Blocks', () => {
    const additionalContent = [
      ...basicEditorState,
      {
        id: 5,
        type: 'image',
        data: {
          alignment: 'left',
          caption: 'Hello World.',
          size: 'medium',
          src: 'https://picsum.photos/480/240'
        },
        meta: {
          title: 'Input Block'
        }
      }, {
        id: 4711,
        type: 'richtext',
        data: {
          value: 'This is the the second block'
        },
        meta: {
          title: 'Second Richtext'
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
