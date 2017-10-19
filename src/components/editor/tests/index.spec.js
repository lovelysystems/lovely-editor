import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Component from '../index'

describe('<Editor />', () => {

  let editorConfig
  let editorContent

  before(() => {
    // current Value
    editorContent = []
    // current EditorConfig
    editorConfig = []
  })

  it('component renders', () => {
    const wrapper = shallow(
      <Component
        editorContent={editorContent}
        editorConfig={editorConfig}
        onChange={() => {}}
      />
    )
    expect(wrapper.exists()).to.equal(true)
  })
})
