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

export const ExampleMenu = ({ menuState, onClick }) => {
  function onClickHandler(action, type, templateId) {
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
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <div {...classes('content')}>
        {map(buttons, ({ action, text, templateId, type }, idx) => (
          <Draggable
            key={`menu-${idx}`}
            draggableId={`${type}:${templateId || 'default'}:${action}:${idx}`}
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
                    key={idx}
                    onClick={() => {
                      onClickHandler(action, type, templateId)
                    }}
                    style={{
                      transform: dragSnapshot.isDragging
                        ? 'rotate(-10deg)'
                        : null,
                      backgroundColor: dragSnapshot.isDragging
                        ? '#0d8eff'
                        : null,
                      border: dragSnapshot.isDragging
                        ? '2px solid #ffffff'
                        : null,
                      margin: '0px 10px 10px 0px'
                    }}
                  >
                    {text}
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
    buttons: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired,
  onClick: PropTypes.func
}

ExampleMenu.defaultProps = {
  onClick: () => {
    // eslint-disable-next-line no-console
    console.log('... onClick triggered')
  }
}
