import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('editor-image')

/**
 * ImageEditor is an example component (with no upload or edit features). It just
 * helps to visualise a default editor in the Storybook. One should always replace
 * this editor with a custom one.
 */
export const ImageEditor = ({ block, onChange }) => {
  const currentValue = get(block, 'data', {})
  const hasImage = currentValue.src !== ''

  const onCaptionChange = event => {
    const value = get(event, 'target.value', '')

    // onChange expects an object with the modified block.data properties
    onChange({
      caption: value
    })
  }

  return (
    <div {...classes('image-container', currentValue.alignment)}>
      <div>
        {hasImage && (
          <img
            {...classes('image', currentValue.size)}
            src={currentValue.src}
            title={currentValue.caption || ''}
            alt={currentValue.caption || ''}
          />
        )}
        {!currentValue.src && <span>No image.</span>}
      </div>
      {hasImage && (
        <div {...classes('caption-container')}>
          <input onChange={onCaptionChange} value={currentValue.caption} />
        </div>
      )}
    </div>
  )
}

ImageEditor.displayName = 'ImageEditor'
ImageEditor.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired
}
