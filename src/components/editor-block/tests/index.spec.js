import React from 'react'
import { expect } from 'code'
import { shallow } from 'enzyme'
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
      expect(wrapper.find('.ls-editor-block__title').containsMatchingElement(block.meta.title))
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
})
