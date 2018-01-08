import React from 'react'
import { get, find } from 'lodash'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import withReadme from 'storybook-readme/with-readme'

// DND Example: https://github.com/alexreardon/react-beautiful-dnd-flow-example/blob/master/src/App.js
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd'

// Helpers
import { BemHelper } from '../../helpers/bem-helper'
import { EditorState } from '../../model/editor-state'

// Component imports
import { ExampleMenu } from '../example-menu'
import { Editor, EditorBlock, EditorQuill, EditorImage } from '../..'
import componentReadme from './README.md'

// Styling
const classes = new BemHelper('example-app')

// WRAPPER SETUP
const defaultMenuState = {
  meta: {
    title: 'Example-Menu'
  },
  buttons: [
    { action: 'add', text: 'Add Richtext', type: 'richtext', templateId: null },
    { action: 'add', text: 'Add Richtext (Template)', type: 'richtext', templateId: 1 },
    { action: 'add', text: 'Add Image', type: 'image', templateId: null },
    { action: 'add', text: 'Add Image (Template)', type: 'image', templateId: 2 },
  ]
}

const defaultDocument = {
  template: [{
    id: 1,
    data: {
      value: '<p>Hello richtext template</p>'
    }
  }, {
    id: 2,
    data: {
      alignment: 'center',
      caption: 'Hello Kevin.',
      size: 'medium',
      src: 'https://media.giphy.com/media/brsEO1JayBVja/giphy.gif'
    }
  }],
  editorState: [{
    id: 7,
    type: 'richtext',
    data: {
      value: '<p>Nested List</p><ul><li>List1</li><li class="ql-indent-1">Nested List</li></ul><p><br></p><p>Hello World. <strong>This is bold.</strong></p>'
    },
    meta: {
      title: 'Quill Block'
    }
  }]
}

// EDITOR SETUP
const defaultBlocksConfig = [
  {
    type: 'richtext',
    component: EditorQuill
  },
  {
    type: 'image',
    component: EditorImage
  }
]

const Placeholder = () => (<div>Drag and Drop an Editor from the Menu here to start.</div>)

/**
 * ExampleBlockWrapper a custom wrapper for the <EditorBlock /> which adds Drag&Drop
 * capabilities
 */
const ExampleBlockWrapper = ({block, children, onAction}) => {
  return (
    <Draggable key={`block-${block.id}`} draggableId={`block-${block.id}`}>
      {(provided, dragSnapshot) => (
        <div>
          <div
            ref={provided.innerRef}
            style={provided.draggableStyle}
            {...provided.dragHandleProps}
          >
            <EditorBlock
              key={block.id}
              block={block}
              onAction={onAction}
            >
              { children }
            </EditorBlock>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  )
}

class Wrapper extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.onChange = this.onChange.bind(this)
    this.state = {
      editorState: get(this.props, 'document.editorState', [])
    }

    // bindings
    this.onChange = this.onChange.bind(this)
    this.onMenuClick = this.onMenuClick.bind(this)
  }

  /**
   * any change by the Editor will be passed to this function. The wrapper can then
   * decide what to do with it. Currently we just get it and update the state.
   * @param  {object}   change contains the new editorState and the block that was changed
   */
  onChange(change) {
    action('onChange')(change)
    this.setState({ editorState: change.editorState })
  }

  /**
   * When the user clicks on one of the Menu-Items, the Menu fires an event,
   * which will contain the block type the user wants to add (event.type),
   * the action (event.action, eg. 'add' or 'remove') and templateId
   * @param  {object}   event contains the event, passed from the ExampleMenu to the Wrapper
   */
  onMenuClick(event) {
    const { editorState } = this.state
    action('onMenuClick')(event)

    let newBlock = null
    if (event.action === 'add') {
      newBlock = this.getBlockTemplate(event)
      if (!!newBlock) {
        this.setState({
          editorState: EditorState.appendBlock(editorState, newBlock)
        })
      }
    }
  }

  /**
   * triggered, once the user let go of the just dragged element
   * @param  {object}   result see https://github.com/atlassian/react-beautiful-dnd#result-dropresult
   */
  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }
    action('onDragEnd')(result)

    let newEditorState = this.state.editorState
    if (!result.source.droppableId.includes('droppable-menu')) {
      // only reorder elements when the element was not added from the menu
      newEditorState = this.reorderBlocks(
        this.state.editorState,
        result.source.index,
        result.destination.index
      )
      this.setState({ editorState: newEditorState })
    } else {
      // or add a new block at the new index to the state
      const { draggableId } = result
      const [type, template, dndAction] = draggableId.split(':')
      const event = { type, template, action: dndAction }
      const newBlock = this.getBlockTemplate(event)
      const newIndex = result.destination.index
      const newEditor = EditorState.appendBlockAtIndex(newEditorState, newBlock, newIndex)
      this.setState({
        editorState: [...newEditor]
      })
    }
  }

  /**
   * Will return a new block, either a template or a default (empty) one
   * @param  {object}   event the event that just triggered the request to get a new block
   * @return {object}         the new block with all its properties
   */
  getBlockTemplate = (event) => {
    const { document: dc } = this.props
    let newBlock = null
    let template = null
    let templateData = null

    // let's check if the event.template has a valid template.id in the document
    // and if so let's use the template when adding the type below
    if (event.template) {
      template = find(dc.template, tm => (tm && tm.id === parseInt(event.template, 10)))
      templateData = get(template, 'data', {})
    }

    switch (event.type) {
    case 'image':
      newBlock = {
        id: Math.floor((Math.random() * 1000) + 1),
        type: 'image',
        data: {
          ...templateData
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
          value: get(templateData, 'value', '')
        },
        meta: {
          title: 'Quill Block'
        }
      }
      break
    default:
      break
    }
    return newBlock
  }

  /**
   * will reorder the editorState according to the startIndex and endIndex
   * @param  {object} editorState
   * @param  {int}   startIndex
   * @param  {int}   endIndex
   * @return {object}
   */
  reorderBlocks = (editorState, startIndex, endIndex) => {
    // see example: https://github.com/alexreardon/react-beautiful-dnd-flow-example/blob/master/src/App.js#L30
    const result = Array.from(editorState)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  render() {
    const { editorState } = this.state
    const { menuState, blocksConfig, blockComponent, placeholder } = this.props

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
                    blockComponent={blockComponent || undefined}
                    blocksConfig={blocksConfig}
                    onChange={this.onChange}
                    placeholder={placeholder || undefined}
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

/**
 * The actual Storybook Stories are created here with the data from above
 */
storiesOf('App/Editor', module)
  .addDecorator(withReadme(componentReadme))
  .add('default Editor', () => {
    return (
      <Wrapper
        document={defaultDocument}
        blocksConfig={defaultBlocksConfig}
        menuState={defaultMenuState}
      />
    )
  })
  .add('empty Editor with a Placeholder', () => {
    const newDocument = {
      ...defaultDocument,
      editorState: []
    }
    return (
      <Wrapper
        document={newDocument}
        blocksConfig={defaultBlocksConfig}
        menuState={defaultMenuState}
        placeholder={Placeholder}
      />
    )
  })
  .add('Editor with multiple Example Blocks', () => {
    const newDocument = {
      ...defaultDocument,
      editorState: [
        ...defaultDocument.editorState,
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
    }
    return (
      <Wrapper
        document={newDocument}
        blocksConfig={defaultBlocksConfig}
        menuState={defaultMenuState}
      />
    )
  })
  .add('Editor with Drag and Drop', () => {
    return (
      <Wrapper
        document={defaultDocument}
        blocksConfig={defaultBlocksConfig}
        blockComponent={ExampleBlockWrapper}
        menuState={defaultMenuState}
      />
    )
  })
