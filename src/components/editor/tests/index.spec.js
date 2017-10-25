import * as React from 'react'
import { expect } from 'code'
import { shallow } from 'enzyme'
import { Editor } from '../'

const Text = () => null
const Image = () => null

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

  it('component renders imported editorState', () => {
    const wrapper = shallow(
      <Editor
        editorState={[
          { type: 'text', id: 'text-1', meta: {}, data: { value: 'one' } },
          { type: 'image', id: 'image-1', meta: {}, data: { value: 'two' } },
          { type: 'text', id: 'text-2', meta: {}, data: { value: 'three' } },
        ]}
        blocksConfig={[
          { type: 'text', component: Text },
          { type: 'image', component: Image },
        ]}
        onChange={() => {}}
      />
    )
    expect(wrapper.find(Text).length).to.equal(2)
    expect(wrapper.find(Image).length).to.equal(1)
  })
})
