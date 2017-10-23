import * as React from 'react'
import { expect } from 'code'
import { shallow } from 'enzyme'
import { Editor } from '../'

describe('<Editor />', () => {

  it('component renders', () => {
    const wrapper = shallow(
      <Editor
        editorState={[]}
        blocksConfig={[]}
        onChange={() => {}}
      />
    )
    expect(wrapper.exists()).to.equal(true)
  })

  // pending tests
  it('component renders imported editorState')
})
