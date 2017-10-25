import * as React from 'react'
import { expect } from 'code'
import { shallow } from 'enzyme'
import sinon from 'sinon'

// Tested Component
import { Editor } from '../'
import { EditorBlock } from '../../editor-block'

const Text = () => null
const Image = () => null

describe('<Editor />', () => {

  describe('Render Tests', () => {

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

  describe('Events Tests', () => {

    const defaultEditorState = [
      { type: 'text', id: 'text-1', meta: {}, data: { value: 'one' } },
    ]

    it('component calls onChange when onContentChange is triggered', () => {
      const changedValues = { data: { value: 'This is an example Text.' } }
      const expectedState = [ Object.assign(defaultEditorState[0], changedValues) ]

      const onChange = sinon.spy()
      const wrapper = shallow(
        <Editor
          editorState={defaultEditorState}
          blocksConfig={[
            { type: 'text', component: Text },
          ]}
          onChange={onChange}
        />
      )

      // start simulating onChanges
      wrapper.find(Text).simulate('change', changedValues)
      expect(onChange.callCount).to.equal(1)
      expect(onChange.lastCall.args[0].editorState).to.equal(expectedState)
    })

    it('component calls onChange when block was removed is triggered', () => {
      const onChange = sinon.spy()
      const wrapper = shallow(
        <Editor
          editorState={defaultEditorState}
          blocksConfig={[
            { type: 'text', component: Text },
          ]}
          onChange={onChange}
        />
      )

      // start simulating onChanges
      const event = { action: 'remove', id: 'text-1' }
      wrapper.find(EditorBlock).simulate('action', event)
      expect(onChange.callCount).to.equal(1)
      expect(onChange.lastCall.args[0].editorState).to.equal([])
    })

    it('component does not change editorState when onBlockAction triggers unknown action', () => {
      const onChange = sinon.spy()
      const wrapper = shallow(
        <Editor
          editorState={defaultEditorState}
          blocksConfig={[
            { type: 'text', component: Text },
          ]}
          onChange={onChange}
        />
      )

      // start simulating onChanges
      const event = { action: null, id: 'text-1' }
      wrapper.find(EditorBlock).simulate('action', event)
      expect(onChange.callCount).to.equal(1)
      expect(onChange.lastCall.args[0].editorState).to.equal(defaultEditorState)
    })
  })
})
