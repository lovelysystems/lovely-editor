import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { EditorBlock } from '../'

const block = {
  meta: {
    title: 'Example Block',
  },
}

describe('<EditorBlock />', () => {

  it('component renders', () => {
    const wrapper = shallow(
      <EditorBlock block={block}>
        <div />
      </EditorBlock>
    )
    expect(wrapper.exists()).to.equal(true)
  })

  it('renders the block title', () => {
    const wrapper = shallow(
      <EditorBlock block={block}>
        <div />
      </EditorBlock>
    )
    expect(wrapper.find('.oy-editor-block__title').text()).to.equal(block.meta.title)
  })

  it('renders the child element', () => {
    const wrapper = shallow(
      <EditorBlock block={block}>
        <div id='child' />
      </EditorBlock>
    )
    expect(wrapper.find('#child').exists()).to.equal(true, '#child not found')
  })
})
