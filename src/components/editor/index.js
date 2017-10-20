import * as React from 'react'

// Helpers
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('editor')

export function Editor(props, context) {

  return (
    <div {...classes('container')}>
      Hello World
    </div>
  )
}
