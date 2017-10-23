import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { map, find } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Editor Components
import { EditorBlock } from '../editor-block'

// Styling
const classes = new BemHelper('editor')

export class Editor extends React.Component {

  onChange(change, id) {
    const { editorContent } = this.props

    // find the block we just changed and update it's data
    const block = find(editorContent, ['id', id])
    block.data = change.data

    const editorChange = {
      editorContent,
      block
    }

    this.props.onChange(editorChange)
  }

  renderEditorBlocks() {
    const { editorContent, editorConfig } = this.props
    const editorBlocksArray = map(editorContent, (block) => {

      return map(editorConfig, (element) => { //eslint-disable-line
        if (block.type === element.type) {
          if (!!element.component) {
            const Component = element.component
            return (
              <EditorBlock
                key={block.id}
                block={block}
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
        { this.renderEditorBlocks() }
      </div>
    )
  }

}

Editor.propTypes = {
  editorConfig: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
  })).isRequired,
  editorContent: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.shape.isRequired,
    meta: PropTypes.shape.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired
}

Editor.defaultProps = {
  onChange: () => { console.log('... on Change clicked') } //eslint-disable-line
}
