import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { Draggable } from 'react-beautiful-dnd'
import { get, map } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('example-menu')

export function ExampleMenu({menuState, onClick}) {

  function onClickHandler(action, type) {
    const event = { action, type }
    onClick(event)
  }

  const title = get(menuState, 'meta.title', 'Editor-Menu')
  const buttons = get(menuState, 'buttons', [])

  return (
    <div {...classes('container')} >
      <div {...classes('title')}>
        {title}
      </div>
      <div {...classes('content')}>
        {map(buttons, ({ action, text, templateId, type }, idx) => (
          <Draggable key={`menu-${idx}`} draggableId={`${type}:${templateId}:${idx}`} disableInteractiveElementBlocking>
            {(provided, dragSnapshot) => (
              <div>
                <div
                  ref={provided.innerRef}
                  style={provided.draggableStyle}
                  {...provided.dragHandleProps}
                >
                  <button key={idx} className='btn' onClick={() => { onClickHandler(action, type) }}>{text}</button>
                </div>
                {provided.placeholder}
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  )
}

ExampleMenu.propTypes = {
  menuState: PropTypes.shape({
    meta: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired
}

ExampleMenu.defaultProps = {
  onClick: () => { console.log('... onClick triggered') } //eslint-disable-line
}
