import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { get } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'
import { ImageToolbar } from './toolbar'
import { ImageEditor } from './editor'

// Styling
const classes = new BemHelper('editor-image')

export class EditorImage extends React.Component {

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(diff) {
    const change = {
      data: {
        ...this.props.block.data,
        ...diff
      }
    }
    this.props.onChange(change)
  }

  onSizeChange = event => {
    const value = get(event, 'target.value', '')
    const currentAlignment = get(this.props, 'block.data.alignment', 'left')
    this.onChange({
      size: value,
      alignment: value === 'full-width' ? 'left' : currentAlignment
    })
  }

  onAlignmentChange = event => {
    const value = get(event, 'target.value', '')
    this.onChange({
      alignment: value
    })
  }

  render() {
    const { block, blockConfig } = this.props
    const { toolbarCallback } = blockConfig
    const currentValue = get(block, 'data', {})

    // customizations
    const EditorToolbar = get(blockConfig, 'toolbar') || ImageToolbar
    const EditorComponent = get(blockConfig, 'editor') || ImageEditor

    return (
      <div {...classes('container')}>
        <div {...classes('toolbar')}>
          <EditorToolbar
            id={block.id}
            currentValue={currentValue}
            onToolbarClick={toolbarCallback}
            onChange={this.onChange}
            onSizeChange={this.onSizeChange}
            onAlignmentChange={this.onAlignmentChange}
          />
        </div>
        <div {...classes('editor')}>
          <EditorComponent block={block} onChange={this.onChange} />
        </div>
      </div>
    )
  }

}

EditorImage.displayName = 'EditorImage'
EditorImage.propTypes = {
  additionalProps: PropTypes.object,
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired
  }).isRequired,
  blockConfig: PropTypes.shape({
    editor: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    toolbar: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    toolbarCallback: PropTypes.func
  }),
  onChange: PropTypes.func.isRequired
}

EditorImage.defaultProps = {
  additionalProps: {},
  blockConfig: {
    editor: ImageEditor,
    toolbar: ImageToolbar,
    toolbarCallback: () => {}
  }
}
