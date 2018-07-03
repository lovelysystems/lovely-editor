import React from 'react'
import { get, find, clone } from 'lodash'
import { action } from '@storybook/addon-actions'

// DND Example: https://github.com/alexreardon/react-beautiful-dnd-flow-example/blob/master/src/App.js
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

// Material-UI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'

// Helpers
import { BemHelper } from '../../src/helpers/bem-helper'
import { EditorState } from '../../src/model/editor-state'


// Components
import { OyezEditor } from '../../src'
import { ExampleMenu } from '../example-menu'
import HTMLPreview from './html-preview'

const dragDropPlaceholder = () => (<div>Add an Editor from the Menu here to start.</div>)

// Styling
const classes = new BemHelper('example-app')

const styles = {
  card: {
    backgroundColor: '#eeeeee',
    margin: '0px 0px 10px 0px'
  }
}

class ExampleApp extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      editorState: get(this.props, 'document.editorState', [])
    }

    // bindings
    this.onChange = this.onChange.bind(this)
    this.onMenuClick = this.onMenuClick.bind(this)
    this.onBlockAction = this.onBlockAction.bind(this)
  }

  /**
   * any change by the OyezEditor will be passed to this function. The wrapper can then
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
   * @param  {object}   event contains the event, passed from the ExampleMenu to the App
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

  onBlockAction(event) {
    const { editorState } = this.state
    let newState = null
    let block = null
    switch (event.action) {
    case 'remove':
      // find the block we just changed and remove it
      block = EditorState.findBlock(editorState, event.id)
      newState = EditorState.removeBlock(editorState, event.id)
      break
    default:
      newState = editorState
      break
    }

    const editorChange = {
      editorState: newState,
      block
    }

    this.onChange(editorChange)
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

    let newEditorState = clone(this.state.editorState)
    if (!result.source.droppableId.includes('droppable-menu')) {
      // only reorder elements when the element was not added from the menu
      newEditorState = this.reorderBlocks(
        newEditorState,
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
    let template = null
    let templateData = null

    // let's check if the event.template has a valid template.id in the document
    // and if so let's use the template when adding the type below
    if (event.template) {
      template = find(dc.template, tm => (tm && tm.id === parseInt(event.template, 10)))
      templateData = get(template, 'data', {})
    }

    const randomId = () => Math.floor((Math.random() * 1000) + 1)

    switch (event.type) {
    case 'image':
      return {
        id: randomId(),
        type: 'image',
        data: {
          ...templateData
        },
        meta: {
          title: 'Image Block'
        }
      }
    case 'richtext':
      return {
        id: randomId(),
        type: 'richtext',
        data: {
          value: get(templateData, 'value', '')
        },
        meta: {
          title: 'Quill Block'
        }
      }
    default:
      return {
        id: randomId(),
        type: event.type,
        data: {
          value: ''
        },
        meta: {
          title: 'Editor'
        }
      }
    }
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
    const { menuState, blocksConfig, blockComponent, placeholder, showPreview } = this.props

    const additionalProps= {
      onBlockAction: this.onBlockAction
    }

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div {...classes('container')} >
          <Droppable droppableId='droppable-menu' isDropDisabled direction='horizontal'>
            {(dropProvided, snapshot) => (
              <div
                ref={dropProvided.innerRef}
                data-dragging={snapshot.isDraggingOver}
                {...dropProvided.droppableProps}
              >
                <Card
                  className={this.props.classes.card}
                >
                  <CardContent>
                    <ExampleMenu
                      menuState={menuState}
                      onClick={this.onMenuClick}
                    />
                  </CardContent>
                </Card>
              </div>
            )}
          </Droppable>
          <div {...classes(showPreview ? 'content-preview' : 'content')}>
            <div {...classes(showPreview ? 'editor-preview' : 'editor')}>
              <Droppable droppableId='droppable-editor'>
                {(dropProvided, snapshot) => (
                  <div
                    ref={dropProvided.innerRef}
                    data-dragging={snapshot.isDraggingOver}
                    {...dropProvided.droppableProps}
                  >
                    <Card
                      className={this.props.classes.card}
                    >
                      <CardContent>
                        <OyezEditor
                          additionalProps={additionalProps}
                          editorState={editorState}
                          blockComponent={blockComponent || undefined}
                          blocksConfig={blocksConfig}
                          onChange={this.onChange}
                          placeholder={!snapshot.isDraggingOver
                            ? (placeholder || undefined)
                            : (dragDropPlaceholder || undefined)
                          }
                          style={{
                            backgroundColor: snapshot.isDraggingOver ? '#989898' : null
                          }}
                        />
                      </CardContent>
                    </Card>
                    {dropProvided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            {showPreview && (
              <div {...classes('preview')} >
                <Card
                  className={this.props.classes.card}
                >
                  <CardContent>
                    <HTMLPreview editorState={editorState} />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </DragDropContext>
    )
  }

}

const App = withStyles(styles)(ExampleApp)

export default App
