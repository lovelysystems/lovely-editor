import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { EditorBlock } from '../../src'

/**
 * ExampleBlockWrapper a custom wrapper for the <EditorBlock /> which adds Drag&Drop
 * capabilities
 *
 * children: the single editor
 */
const ExampleBlockWrapper = ({block, blockIndex, children, onAction}) => {
  return (
    <Draggable key={`block-${block.id}`} draggableId={`block-${block.id}`} index={blockIndex}>
      {(provided, dragSnapshot) => (
        <div>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
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
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  )
}

export default ExampleBlockWrapper
