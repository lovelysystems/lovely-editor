import { filter, find, map } from 'lodash'

const findBlock = (editorState, blockId) =>
  find(editorState, ['id', blockId])

const removeBlock = (editorState, blockId) =>
  filter(editorState, b => b.id !== blockId)

const updateBlockData = (editorState, blockId, data) =>
  map(editorState, block => {
    if (block.id === blockId) {
      return {
        ...block,
        data
      }
    }
    return block
  })

const appendBlock = (editorState, block) =>
  [...editorState, block]

export const EditorState = {
  findBlock,
  removeBlock,
  updateBlockData,
  appendBlock,
}
