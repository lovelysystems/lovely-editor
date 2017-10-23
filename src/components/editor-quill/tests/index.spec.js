import React from 'react'
import { expect } from 'code'
import { render } from 'enzyme'
import { EditorQuill } from '../'

const block = {
  id: 5,
  data: {
    value: ''
  },
  meta: {
    title: 'Input Box'
  }
}

describe('<EditorQuill />', () => {

  it('component renders with Navigation', () => {
    const wrapper = render(<EditorQuill block={block} onChange={()=>{}} />)
    expect(wrapper.find('.quill')).to.have.length(1)
    expect(wrapper.find('#toolbar-5')).to.have.length(1)
  })

  // pending tests
  it('component can import html')
  it('component can import nested lists')
})
