import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { get } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('editor-block')

export function EditorBlock(props) {

  const { block } = props
  const title = get(block, 'meta.title', 'Editor-Block')

  return (
    <div {...classes('container')} >
      <div {...classes('title')}>
        {title}
      </div>
      <div {...classes('content')}>
        {props.children}
      </div>
    </div>
  )
}

EditorBlock.propTypes = {
  block: PropTypes.shape({
    meta: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  children: PropTypes.element.isRequired
}
