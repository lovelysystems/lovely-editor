import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { get } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('example-menu')

export function ExampleMenu(props) {

  function onClick(action, type) {
    const event = { action, type }
    props.onClick(event)
  }

  const { menuState } = props
  const title = get(menuState, 'meta.title', 'Editor-Menu')

  return (
    <div {...classes('container')} >
      <div {...classes('title')}>
        {title}
      </div>
      <div {...classes('content')}>
        <button {...classes(null, null, 'btn')} onClick={() => onClick('add', 'text')}>
          Add Text-Block
        </button>
        <button {...classes(null, null, 'btn')} onClick={() => onClick('add', 'image')}>
          Add Image-Block
        </button>
        <button {...classes(null, null, 'btn')} onClick={() => onClick('add', 'richtext')}>
          Add Richmedia-Block
        </button>
      </div>
    </div>
  )
}

ExampleMenu.propTypes = {
  menuState: PropTypes.shape({
    meta: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

ExampleMenu.defaultProps = {
  onClick: () => { console.log('... onClick triggered') } //eslint-disable-line
}
