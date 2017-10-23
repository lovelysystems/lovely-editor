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
        <button onClick={() => onClick('add', 'text')}>
          Text-Block hinzufügen
        </button>
        <button onClick={() => onClick('add', 'image')}>
          Bild-Block hinzufügen
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
