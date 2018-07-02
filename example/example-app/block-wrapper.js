import React from 'react'
import { Draggable } from 'react-beautiful-dnd'


// Material-UI
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'

import { get } from 'lodash'

import { EditorBlock } from '../../src'

/**
 * ExampleBlockWrapper
 *
 * - custom wrapper for the <EditorBlock /> which adds Drag&Drop
 *   capabilities
 * - in your own app this you could replace the EditorBlock also completely and
 *   add your own eg. Delete Button, Drag and Drop Handler or other features.
 *
 * children: the single editor (eg. EditorQuill)
 */
const ExampleBlockWrapper = ({block, blockIndex, children, onAction}) => {

  const title = get(block, 'meta.title', 'Untitled')

  return (
    <Draggable key={`block-${block.id}`} draggableId={`block-${block.id}`} index={blockIndex}>
      {(provided, dragSnapshot) => (
        <div>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card
              style={{
                margin: '0px 0px 10px 0px'
              }}
            >
              <CardContent>
                <Typography variant="title" gutterBottom>
                  {title}
                </Typography>
                <EditorBlock
                  key={block.id}
                  block={block}
                  onAction={onAction}
                  style={{
                    backgroundColor: dragSnapshot.isDragging ? '#fbfbfb' : null,
                    border: dragSnapshot.isDragging ? '2px dashed #c8c9c9' : null,
                    opacity: dragSnapshot.isDragging ? '0.6' : null
                  }}
                >
                  { children }
                </EditorBlock>
              </CardContent>
            </Card>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  )
}

export default ExampleBlockWrapper
