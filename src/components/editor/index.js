import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { map, find } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Editor Components
import { EditorBlock } from '../editor-block'
import { EditorMenu } from '../editor-menu'

// Styling
const classes = new BemHelper('editor')

export class Editor extends React.Component {

  // event listeners
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
  onMenuClick(event) {
    this.props.onMenuClick(event)
  }
  onBlockClick(event) {
    this.props.onBlockClick(event)
  }

  // render helpers
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
                onClick={(event) => this.onBlockClick(event)}
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

  renderEditorMenu() {
    // NOTE: move Menu Config to User/Wrapper component who uses the Editor
    const dummyMenu = {
      meta: {
        title: 'Dummy-Menu'
      }
    }

    return (
      <EditorMenu
        menu={dummyMenu}
        onClick={(event) => this.onMenuClick(event)}
      />
    )
  }

  render() {
    return (
      <div {...classes('container')}>
        <div {...classes('menu')}>
          { this.renderEditorMenu() }
        </div>
        <div {...classes('blocks')}>
          { this.renderEditorBlocks() }
        </div>
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
  onChange: PropTypes.func.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  onBlockClick: PropTypes.func.isRequired
}

Editor.defaultProps = {
  onChange: () => { console.log('... onChange triggered') }, //eslint-disable-line
  onMenuClick: () => { console.log('... onMenuClick triggered') }, //eslint-disable-line
  onBlockClick: () => { console.log('... onBlockClick triggered') } //eslint-disable-line
}
