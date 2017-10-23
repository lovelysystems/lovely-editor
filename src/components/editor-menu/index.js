import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { get } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('editor-menu')

export function EditorMenu(props) {

  function onClick(action, type) {
    const event = { action, type }
    props.onClick(event)
  }

  // TODO
  // - add dynamic typ
  // - add new block with data (define who's responsible)
  const { menu } = props
  const title = get(menu, 'meta.title', 'Editor-Menu')

  return (
    <div {...classes('container')} >
      <div {...classes('title')}>
        {title}
      </div>
      <div {...classes('content')}>
        <button onClick={() => onClick('add', 'text')}>
          Text-Block hinzufügen
        </button>
      </div>
    </div>
  )
}

EditorMenu.propTypes = {
  menu: PropTypes.shape({
    meta: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

EditorMenu.defaultProps = {
  onClick: () => { console.log('... onClick trigggered') } //eslint-disable-line
}
