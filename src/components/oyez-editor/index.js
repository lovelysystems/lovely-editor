import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { map, merge } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'
import { EditorState } from '../../model/editor-state'

// OyezEditor Components
import { EditorBlock } from '../editor-block'

// Styling
const classes = new BemHelper('editor')

/**
 * OyezEditor component
 *
 * is responsible for
 * - rendering the blocks (see renderEditorBlocks)
 * - telling the <Wrapper /> when the content of a block changes (see onContentChange)
 *   or a block triggers an action (see onBlockAction)
 */
export class OyezEditor extends React.Component {

  // event listeners and handlers
  onContentChange(change, blockId) {
    const { editorState } = this.props

    // find the block we just changed and update its data
    const block = EditorState.findBlock(editorState, blockId)
    const newEditorState = EditorState.updateBlockData(editorState, blockId, change.data)
    const editorChange = {
      editorState: newEditorState,
      block: merge({}, block, {
        data: { ...change.data }
      })
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
    const { additionalProps, blocksConfig, blockComponent: BlockWrapperComponent, editorState, placeholder  } = this.props

    // let's return the placeholder if the editorState is empty
    if (!editorState || editorState && editorState.length === 0) {
      return React.createElement(placeholder)
    }

    // then we iterate over the editorState, get each block and map the block.types
    // with the element.type. Once they match we return a wrapped block with the
    // editor component
    const editorBlocksArray = map(editorState, (block, index) => {

      return map(blocksConfig, (config) => { //eslint-disable-line
        if (block.type === config.type && typeof config.component === 'function') {
          const Component = config.component
          const blockConfig = config.blockConfig || {}

          return (
            <BlockWrapperComponent
              additionalProps={additionalProps}
              key={block.id}
              blockIndex={index} // react-beautiful-dnd is optional, still it is needed when react-beautiful-dnd > 4.0.x is used
              block={block}
              blockConfig={blockConfig}
              onAction={(event) => this.onBlockAction(event)}
            >
              <Component
                additionalProps={additionalProps}
                block={block}
                blockConfig={blockConfig}
                onChange={(change) => this.onContentChange(change, block.id)}
              />
            </BlockWrapperComponent>
          )
        }
      })
    })

    return editorBlocksArray
  }

  render() {
    return (
      <div {...classes('container')} style={this.props.style}>
        <div {...classes('blocks')}>
          {this.renderEditorBlocks()}
        </div>
      </div>
    )
  }

}

OyezEditor.propTypes = {
  additionalProps: PropTypes.object,
  blockComponent: PropTypes.func,
  blocksConfig: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    data: PropTypes.object
  })).isRequired,
  editorState: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.shape.isRequired,
    meta: PropTypes.shape.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  style: PropTypes.object
}

OyezEditor.defaultProps = {
  additionalProps: {},
  blockComponent: EditorBlock,
  placeholder: () => null,
  style: {}
}
