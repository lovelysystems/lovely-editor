import React from 'react'
import { expect } from 'code'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { EditorBlock } from '../'

const block = {
  id: 1,
  meta: {
    title: 'Example Block',
  },
}

describe('<EditorBlock />', () => {

  describe('Render Tests', () => {
    it('component renders', () => {
      const wrapper = shallow(
        <EditorBlock block={block} onAction={() => {}}>
          <div />
        </EditorBlock>
      )
      expect(wrapper.exists()).to.equal(true)
    })

    it('renders the block title', () => {
      const wrapper = shallow(
        <EditorBlock block={block} onAction={() => {}}>
          <div />
        </EditorBlock>
      )
      expect(wrapper.find('.oy-editor-block__title').text()).to.equal(block.meta.title)
    })

    it('renders the child element', () => {
      const wrapper = shallow(
        <EditorBlock block={block} onAction={() => {}}>
          <div id='child' />
        </EditorBlock>
      )
      expect(wrapper.find('#child').exists()).to.equal(true)
    })
  })

  describe('Event Tests', () => {
    it('component calls onRemove when remove-button was clicked', () => {

      const onAction = sinon.spy()
      const wrapper = shallow(
        <EditorBlock block={block} onAction={onAction}>
          <div id='child' />
        </EditorBlock>
      )

      const action = { action: 'remove', id: 1 }
      wrapper.find('.oy-editor-block__action-remove').simulate('click')
      expect(onAction.callCount).to.equal(1)
      expect(onAction.lastCall.args[0]).to.equal(action)
    })
  })

})
