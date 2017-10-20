import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { EditorBlock } from '../'

describe('<EditorBlock />', () => {

  it('component renders', () => {
    const wrapper = shallow(
      <EditorBlock />
    )
    expect(wrapper.exists()).to.equal(true)
  })
})
