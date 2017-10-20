import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('editor-block')

export function EditorBlock(props, context) {

  return (
    <div {...classes('container')}>
      <div {...classes('content')}>
        {props.children}
      </div>
    </div>
  )
}

EditorBlock.propTypes = {
  children: PropTypes.element.isRequired
}
