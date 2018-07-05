import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { get } from 'lodash'

// Material-UI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

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
const ExampleBlockWrapper = ({additionalProps, block, blockIndex, children}) => {

  const onDelete = () => {
    const blockId = get(block, 'id')
    if(additionalProps !== null && additionalProps !== undefined && typeof additionalProps.onBlockAction === 'function') {
      additionalProps.onBlockAction({
        action: 'remove',
        id: blockId
      })
    }
  }

  return (
    <Draggable key={`block-${block.id}`} draggableId={`block-${block.id}`} index={blockIndex}>
      {(provided, dragSnapshot) => (
        <div className="ls-example-block-wrapper">
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card
              style={{
                margin: '0px 0px 10px 0px',
                backgroundColor: dragSnapshot.isDragging ? '#fbfbfb' : null,
                border: dragSnapshot.isDragging ? '2px dashed #c8c9c9' : null,
                opacity: dragSnapshot.isDragging ? '0.6' : null
              }}
            >
              <CardContent>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  onClick={onDelete}
                  style={{
                    float: 'right'
                  }}
                >
                  Delete
                </Button>
                <EditorBlock
                  key={block.id}
                  block={block}
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
