import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { map } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Editor Components
import { EditorBlock } from '../editor-block'

// Styling
const classes = new BemHelper('editor')

export class Editor extends React.Component {

  onChange(newData, index) {
    const { editorContent } = this.props
    const delta = {
      id: editorContent[index].id,
      data: newData
    }
    editorContent[index].data = newData
    this.props.onChange(editorContent, delta)
  }

  renderEditorBlocks() {
    const { editorContent, editorConfig } = this.props
    const editorBlocksArray = map(editorContent, (block, index) => {

      return map(editorConfig, (element, confIndex) => { //eslint-disable-line
        if (block.type === element.type) {
          if (!!element.component) {
            const Component = element.component
            return (
              <EditorBlock key={index}>
                <Component
                  data={editorContent[index].data}
                  meta={editorContent[index].meta}
                  index={index}
                  onChange={(newData, blockIndex) => this.onChange(newData, blockIndex)}
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
    date: PropTypes.shape.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired
}

Editor.defaultProps = {
  onChange: () => { console.log('... on Change clicked') } //eslint-disable-line
}
