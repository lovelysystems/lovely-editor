import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { Draggable } from 'react-beautiful-dnd'
import { map } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'
import { EditorState } from '../../model/editor-state'

// Editor Components
import { EditorBlock } from '../editor-block'

// Styling
const classes = new BemHelper('editor')

export class Editor extends React.Component {

  // event listeners and handlers
  onContentChange(change, blockId) {
    const { editorState } = this.props

    // find the block we just changed and update its data
    const block = EditorState.findBlock(editorState, blockId)
    const newEditorState = EditorState.updateBlockData(editorState, blockId, change.data)
    const editorChange = {
      editorState: newEditorState,
      block
    }

    this.props.onChange(editorChange)
  }

  onBlockAction(event) {
    const { editorState } = this.props
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

    this.props.onChange(editorChange)
  }

  // render helpers
  renderEditorBlocks() {
    const { editorState, blocksConfig } = this.props
    const editorBlocksArray = map(editorState, (block) => {

      return map(blocksConfig, (element) => { //eslint-disable-line
        if (block.type === element.type) {
          if (!!element.component) {
            const Component = element.component
            return (
              <Draggable key={`block-${block.id}`} draggableId={`block-${block.id}`}>
                {(provided, dragSnapshot) => (
                  <div>
                    <div
                      {...classes('menu')}
                      ref={provided.innerRef}
                      style={provided.draggableStyle}
                      {...provided.dragHandleProps}
                    >
                      <EditorBlock
                        key={block.id}
                        block={block}
                        onAction={(event) => this.onBlockAction(event)}
                      >
                        <Component
                          block={block}
                          onChange={(change) => this.onContentChange(change, block.id)}
                        />
                      </EditorBlock>
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Draggable>
            )
          }
        }
      })
    })

    return editorBlocksArray
  }

  render() {
    return (
      <div {...classes('container')}>
        <div {...classes('blocks')}>
          {this.renderEditorBlocks()}
        </div>
      </div>
    )
  }

}

Editor.propTypes = {
  blocksConfig: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
  })).isRequired,
  editorState: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOf(PropTypes.number, PropTypes.string).isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.shape.isRequired,
    meta: PropTypes.shape.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired
}
