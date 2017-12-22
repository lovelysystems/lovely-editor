import { filter, find, map } from 'lodash'

/**
 * @typedef {ContentBlock[]} EditorState
 *
 * @typedef {Object} ContentBlock
 *  @property {string} id
 *  @property {ContentBlockData} data
 *  @property {ContentBlockMeta} meta
 *
 * @typedef {Object} ContentBlockData
 *
 * @typedef {Object} ContentBlockMeta
 *  @property {string} title
 */

/**
 * Returns the block identified by `blockId` or undefined if `editorState`
 * contains no such block.
 *
 * @param {EditorState} editorState
 * @param {string} blockId
 *
 * @returns [ContentBlock]
 */
const findBlock = (editorState, blockId) =>
  find(editorState, ['id', blockId])

/**
 * Creates a new EditorState with the specified block removed.
 *
 * @param {EditorState} editorState
 * @param {string} blockId
 *
 * @returns {EditorState}
 */
const removeBlock = (editorState, blockId) =>
  filter(editorState, b => b.id !== blockId)

/**
 * Creates a new EditorState with the specified block's data updated to the
 * specified data.
 *
 * @param {EditorState} editorState
 * @param {string} blockId
 * @param {ContentBlockData} data
 *
 * @returns {EditorState}
 */
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

/**
 * Creates a new EditorState with the specified block added to the end.
 *
 * @param {EditorState} editorState
 * @param {ContentBlock} block
 *
 * @returns {EditorState}
 */
const appendBlock = (editorState, block) =>
  [...editorState, block]

/**
 * Inserts the block at a given index in the new EditorState
 *
 * @param {EditorState} editorState
 * @param {ContentBlock} block
 * @param {number} idx
 *
 * @returns {EditorState}
 */
const appendBlockAtIndex = (editorState, block, idx = 0) =>
  [
  // part of the array before the specified index
    ...editorState.slice(0, idx),
    // inserted item
    block,
    // part of the array after the specified index
    ...editorState.slice(idx)
  ]

export const EditorState = {
  findBlock,
  removeBlock,
  updateBlockData,
  appendBlock,
  appendBlockAtIndex
}
