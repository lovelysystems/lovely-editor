import * as React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { Editor } from '../'

describe('<Editor />', () => {

  it('component renders', () => {
    const wrapper = shallow(
      <Editor
        editorContent={[]}
        editorConfig={[]}
        onChange={() => {}}
      />
    )
    expect(wrapper.exists()).to.equal(true)
  })
})
