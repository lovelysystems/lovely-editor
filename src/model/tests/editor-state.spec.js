import { expect } from 'code'

import { EditorState } from '../editor-state'

describe('EditorState', () => {
  describe('findBlock', () => {
    it('finds the block by its id', () => {
      const editorState = [
        { id: 'block-one', type: 'text' },
        { id: 'block-two', type: 'text' },
      ]
      const block = EditorState.findBlock(editorState, 'block-two')
      expect(block).to.equal(editorState[1])
    })
  })

  describe('appendBlock', () => {
    it('adds the specified block to the end', () => {
      const editorState = [
        { id: 'block-one', type: 'text' },
      ]
      const block = { id: 'block-two', type: 'text' }
      const newEditorState = EditorState.appendBlock(editorState, block)
      expect(newEditorState).to.equal([
        editorState[0],
        block,
      ])
    })
  })

  describe('removeBlock', () => {
    it('removes the block identified by its id', () => {
      const editorState = [
        { id: 'block-one', type: 'text' },
        { id: 'block-two', type: 'text' },
      ]
      const newEditorState = EditorState.removeBlock(editorState, 'block-two')
      expect(newEditorState).to.equal([
        editorState[0],
      ])
    })

    it('leaves the original editor state as is', () => {
      const editorState = [
        { id: 'block-one', type: 'text' },
        { id: 'block-two', type: 'text' },
      ]
      const newEditorState = EditorState.removeBlock(editorState, 'block-two')
      expect(newEditorState).to.have.length(1)
      expect(editorState).to.have.length(2)
    })
  })

  describe('updateBlockData', () => {
    it('updates the data of the block identified by its id', () => {
      const editorState = [
        { id: 'b1', type: 'text', data: { value: 'abc' } },
        { id: 'b2', type: 'text', data: { value: 'mno' } },
        { id: 'b3', type: 'text', data: { value: 'xyz' } },
      ]
      const newEditorState = EditorState.updateBlockData(editorState, 'b2', { value: 'QRS' })
      expect(newEditorState).to.equal([
        editorState[0],
        { id: 'b2', type: 'text', data: { value: 'QRS' } },
        editorState[2],
      ])
    })

    it('leaves the original editor state as is', () => {
      const editorState = [
        { id: 'b1', type: 'text', data: { value: 'abc' } },
        { id: 'b2', type: 'text', data: { value: 'mno' } },
        { id: 'b3', type: 'text', data: { value: 'xyz' } },
      ]
      EditorState.updateBlockData(editorState, 'b2', { value: 'QRS' })
      expect(editorState[1].data).to.equal({ value: 'mno' })
    })
  })
})
