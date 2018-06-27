import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
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
