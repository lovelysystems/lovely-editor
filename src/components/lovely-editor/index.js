import * as React from 'react'
import PropTypes from 'prop-types'
import { map, merge } from 'lodash'

import { BemHelper } from '../../helpers/bem-helper'
import { EditorState } from '../../model/editor-state'
// LovelyEditor Components
import { EditorBlock } from '../editor-block'

// Styling
const classes = new BemHelper('editor')

/**
 * LovelyEditor component
 *
 * is responsible for
 * - rendering the blocks (see renderEditorBlocks)
 * - telling the <Wrapper /> when the content of a block changes (see onContentChange)
 *   or a block triggers an action (see onBlockAction)
 */
export class LovelyEditor extends React.Component {
  // event listeners and handlers
  onContentChange(change, blockId) {
    const { editorState, onChange } = this.props

    // find the block we just changed and update its data
    const block = EditorState.findBlock(editorState, blockId)
    const newEditorState = EditorState.updateBlockData(
      editorState,
      blockId,
      change.data,
    )
    const editorChange = {
      editorState: newEditorState,
      block: merge({}, block, {
        data: { ...change.data },
      }),
    }

    onChange(editorChange)
  }

  // render helpers
  renderEditorBlocks() {
    const {
      additionalProps,
      blocksConfig,
      blockComponent: BlockWrapperComponent,
      editorState,
      placeholder,
    } = this.props

    // let's return the placeholder if the editorState is empty
    if (!editorState || (editorState && editorState.length === 0)) {
      return React.createElement(placeholder)
    }

    // then we iterate over the editorState, get each block and map the block.types
    // with the element.type. Once they match we return a wrapped block with the
    // editor component
    const editorBlocksArray = map(editorState, (block, index) => {
      return map(blocksConfig, config => {
        if (
          block.type === config.type &&
          typeof config.component === 'function'
        ) {
          const Component = config.component
          const blockConfig = config.blockConfig || {}

          return (
            <BlockWrapperComponent
              additionalProps={additionalProps}
              key={block.id}
              blockIndex={index} // react-beautiful-dnd is optional, still it is needed when react-beautiful-dnd > 4.0.x is used
              block={block}
              blockConfig={blockConfig}
            >
              <Component
                additionalProps={additionalProps}
                block={block}
                blockConfig={blockConfig}
                onChange={change => this.onContentChange(change, block.id)}
              />
            </BlockWrapperComponent>
          )
        }

        return null
      })
    })

    return editorBlocksArray
  }

  render() {
    const { style } = this.props

    return (
      <div {...classes('container')} style={style}>
        <div {...classes('blocks')}>{this.renderEditorBlocks()}</div>
      </div>
    )
  }
}

LovelyEditor.propTypes = {
  additionalProps: PropTypes.shape({}),
  blockComponent: PropTypes.func,
  blocksConfig: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
      data: PropTypes.shape({}),
    }),
  ).isRequired,
  editorState: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      type: PropTypes.string.isRequired,
      data: PropTypes.shape.isRequired,
      meta: PropTypes.shape.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  style: PropTypes.shape({}),
}

LovelyEditor.defaultProps = {
  additionalProps: {},
  blockComponent: EditorBlock,
  placeholder: () => null,
  style: {},
}
