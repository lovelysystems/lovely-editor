import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { Draggable } from 'react-beautiful-dnd'
import { get, map } from 'lodash'
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

  const buttons = [
    { text: 'Add Richtext', onClickFunc: () => { onClick('add', 'richtext') }},
    { text: 'Add Image', onClickFunc: () => {onClick('add', 'image')}},
  ]

  return (
    <div {...classes('container')} >
      <div {...classes('title')}>
        {title}
      </div>
      <div {...classes('content')}>
        {map(buttons, ({onClickFunc ,text}, idx) => (
          <Draggable key={`menu-${idx}`} draggableId={`menu-${idx}`} disableInteractiveElementBlocking>
            {(provided, dragSnapshot) => (
              <div>
                <div
                  ref={provided.innerRef}
                  style={provided.draggableStyle}
                  {...provided.dragHandleProps}
                >
                  <button key={idx} className='btn' onClick={onClickFunc}>{text}</button>
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
  onClick: PropTypes.func.isRequired
}

ExampleMenu.defaultProps = {
  onClick: () => { console.log('... onClick triggered') } //eslint-disable-line
}
