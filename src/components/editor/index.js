import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { map, find, filter } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Editor Components
import { EditorBlock } from '../editor-block'

// Styling
const classes = new BemHelper('editor')

export class Editor extends React.Component {

  // event listeners and handlers
  onChange(change, id) {
    const { editorState } = this.props

    // find the block we just changed and update it's data
    const block = find(editorState, ['id', id])
    block.data = change.data

    const editorChange = {
      editorState,
      block
    }

    this.props.onChange(editorChange)
  }
  onBlockDelete(event) {
    const { editorState } = this.props

    // find the block we just changed and remove it
    const block = find(editorState, ['id', event.id])
    const newState = filter(editorState, function(blockObj) {
      return blockObj.id !== event.id
    })

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
              <EditorBlock
                key={block.id}
                block={block}
                onBlockDelete={(event) => this.onBlockDelete(event)}
              >
                <Component
                  block={block}
                  onChange={(change) => this.onChange(change, block.id)}
                />
              </EditorBlock>
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
          { this.renderEditorBlocks() }
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
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.shape.isRequired,
    meta: PropTypes.shape.isRequired,
  })).isRequired,
  onChange: PropTypes.func,
  onBlockDelete: PropTypes.func
}

Editor.defaultProps = {
  onChange: () => { console.log('... onChange triggered') }, //eslint-disable-line
  onBlockDelete: () => { console.log('... onBlockClick triggered') } //eslint-disable-line
}
