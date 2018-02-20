import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { get } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'
import { ImageToolbar } from './toolbar'

// Styling
const classes = new BemHelper('editor-image')

export class EditorImage extends React.Component {

  onChange(diff) {
    const change = {
      data: {
        ...this.props.block.data,
        ...diff
      }
    }
    this.props.onChange(change)
  }

  onCaptionChange = (event) => {
    const value = get(event, 'target.value', '')
    this.onChange({
      caption: value
    })
  }

  onSizeChange = (event) => {
    const value = get(event, 'target.value', '')
    const currentAlignment = get(this.props, 'block.data.alignment', 'left')
    this.onChange({
      size: value,
      alignment: value === 'full-width' ? 'left' : currentAlignment
    })
  }

  onAlignmentChange = (event) => {
    const value = get(event, 'target.value', '')
    this.onChange({
      alignment: value
    })
  }

  render() {
    const { block, blockConfig } = this.props
    const { toolbarCallback } = blockConfig
    const currentValue = get(block, 'data', {})
    const hasImage = currentValue.src && currentValue.src !== ''

    // customizations
    const EditorToolbar = get(blockConfig, 'toolbar') || ImageToolbar
    return (
      <div {...classes('container')}>
        <div {...classes('toolbar')}>
          <EditorToolbar
            id={block.id}
            currentValue={currentValue}
            onToolbarClick={toolbarCallback}
            onSizeChange={this.onSizeChange}
            onAlignmentChange={this.onAlignmentChange}
          />
        </div>
        <div {...classes('image-container', currentValue.alignment)}>
          { hasImage && (
            <img
              {...classes('image', currentValue.size)}
              src={currentValue.src}
              title={currentValue.caption || ''}
              alt={currentValue.caption || ''}
            />
          )}
          { !currentValue.src && (
            <span>No image.</span>
          )}
        </div>
        { hasImage && (
          <div {...classes('caption-container')}>
            <input onChange={this.onCaptionChange} value={currentValue.caption} />
          </div>
        )}
      </div>
    )
  }

}

EditorImage.displayName = 'EditorImage'
EditorImage.propTypes = {
  additionalProps: PropTypes.object,
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
  }).isRequired,
  blockConfig: PropTypes.shape({
    toolbar: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    toolbarCallback: PropTypes.func
  }),
  onChange: PropTypes.func.isRequired
}

EditorImage.defaultProps = {
  additionalProps: {},
  blockConfig: {
    toolbar: ImageToolbar,
    toolbarCallback: () => {}
  }
}
