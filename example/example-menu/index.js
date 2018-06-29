import * as React from 'react'
import PropTypes from 'prop-types'

// Material-UI
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// Helpers
import { Draggable } from 'react-beautiful-dnd'
import { get, map } from 'lodash'
import { BemHelper } from '../../src/helpers/bem-helper'

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
  // - the `draggableId` is used to help the App to
  //   determine which action should be triggered for a block type. The templateId
  //   is used to match the action with a block template.
  // - structure: `type:templateId:action:idx`
  //
  // Example
  // - App with a `document` property like
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
    <div>
      <Typography variant="display1" gutterBottom>
        {title}
      </Typography>
      <div {...classes('content')}>
        {map(buttons, ({ action, text, templateId, type }, idx) => (
          <Draggable
            key={`menu-${idx}`}
            draggableId={`${type}:${templateId || 'default' }:${action}:${idx}`}
            disableInteractiveElementBlocking
            index={idx}
          >
            {(provided, dragSnapshot) => (
              <div>
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    key={idx}
                    // className='btn'
                    onClick={() => { onClickHandler(action, type, templateId) }}
                    style={{
                      transform: dragSnapshot.isDragging ? 'rotate(-10deg)' : null,
                      backgroundColor: dragSnapshot.isDragging ? '#0d8eff' : null,
                      border: dragSnapshot.isDragging ? '2px solid #ffffff' : null,
                      margin: '0px 10px 10px 0px'
                    }}
                  >
                    {text}
                    {/* </button> */}
                  </Button>
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
