import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { Draggable } from 'react-beautiful-dnd'
import { get, map } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('example-menu')

export function ExampleMenu({menuState, onClick}) {

  function onClickHandler(action, type, templateId ) {
    const event = { action, type, template: templateId }
    onClick(event)
  }

  const title = get(menuState, 'meta.title', 'Editor-Menu')
  const buttons = get(menuState, 'buttons', [])

  // Documentation `draggableId`
  // - the `draggableId` is used to help the Wrapper component of the Editor to
  //   determine which action should be triggered for a block type. The templateId
  //   is used to match the action with a block template.
  // - structure: `type:templateId:action:idx`
  //
  // Example
  // - Editor Wrapper with a `document` property like
  // {
  //  template: [{
  //   id: 2,
  //   data: {
  //     alignment: 'center',
  //     caption: 'Hello Kevin.',
  //     size: 'medium',
  //     src: 'https://media.giphy.com/media/brsEO1JayBVja/giphy.gif'
  //   }
  //  }]
  // },
  // - `image:2:add:1` => an image block with values of the template id 2 should be added
  return (
    <div {...classes('container')} >
      <div {...classes('title')}>
        {title}
      </div>
      <div {...classes('content')}>
        {map(buttons, ({ action, text, templateId, type }, idx) => (
          <Draggable
            key={`menu-${idx}`}
            draggableId={`${type}:${templateId || 'default' }:${action}:${idx}`}
            disableInteractiveElementBlocking
          >
            {(provided, dragSnapshot) => (
              <div>
                <div
                  ref={provided.innerRef}
                  style={provided.draggableStyle}
                  {...provided.dragHandleProps}
                >
                  <button
                    key={idx}
                    className='btn'
                    onClick={() => { onClickHandler(action, type, templateId) }}
                  >
                    {text}
                  </button>
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
