import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { get } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('editor-block')

export const EditorBlock = ({ block, children, style }) => {
  const title = get(block, 'meta.title', 'Untitled')
  return (
    <div {...classes('container')} style={style}>
      <div {...classes('header')}>
        <div {...classes('title')}>
          <h2>{title}</h2>
        </div>
      </div>
      <div {...classes('content')}>{children}</div>
    </div>
  )
}

EditorBlock.propTypes = {
  additionalProps: PropTypes.object,
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    meta: PropTypes.objectOf(PropTypes.string).isRequired
  }).isRequired,
  blockConfig: PropTypes.object,
  children: PropTypes.element.isRequired,
  style: PropTypes.object
}

EditorBlock.defaultProps = {
  additionalProps: {},
  blockConfig: {},
  style: {}
}
