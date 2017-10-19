import React from 'react'
import { expect } from 'chai'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Component from '../index'

// Enzyme Configuration
Enzyme.configure({ adapter: new Adapter() })

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
