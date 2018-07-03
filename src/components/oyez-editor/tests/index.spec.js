import * as React from 'react'
import { expect } from 'code'
import { shallow } from 'enzyme'
import sinon from 'sinon'

// Tested Component
import { OyezEditor } from '../'

const Text = () => null
const Image = () => null
const CustomBlockWrapper = () => null
const Placeholder = () => null

describe('OyezEditor', () => {

  describe('Render Tests', () => {

    it('component renders', () => {
      const wrapper = shallow(
        <OyezEditor
          editorState={[]}
          blocksConfig={[]}
          onChange={() => {}}
        />
      )
      expect(wrapper.exists()).to.equal(true)
    })

    it('component renders a custom blockComponent if the prop blockComponent is set', () => {
      const wrapper = shallow(
        <OyezEditor
          editorState={[
            { type: 'text', id: 'text-1', meta: {}, data: { value: 'one' } },
          ]}
          blocksConfig={[
            { type: 'text', component: Text },
          ]}
          blockComponent={CustomBlockWrapper}
          onChange={() => {}}
        />
      )
      expect(wrapper.find(CustomBlockWrapper).length).to.equal(1)
    })

    it('component renders a placeholder if the editorState is empty', () => {
      const wrapper = shallow(
        <OyezEditor
          editorState={[]}
          blocksConfig={[]}
          placeholder={Placeholder}
          onChange={() => {}}
        />
      )
      expect(wrapper.find(Placeholder).length).to.equal(1)
    })

    it('component renders imported editorState an does not render placeholder', () => {
      const wrapper = shallow(
        <OyezEditor
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
      expect(wrapper.find(Placeholder).length).to.equal(0)
      expect(wrapper.find(Text).length).to.equal(2)
      expect(wrapper.find(Image).length).to.equal(1)
    })

    it('component passes blockConfig to both the Block and the OyezEditor Component', () => {
      const expectedConfig = { example: 'test' }
      const wrapper = shallow(
        <OyezEditor
          editorState={[
            { type: 'text', id: 'text-1', meta: {}, data: { value: 'one' } },
          ]}
          blocksConfig={[
            { type: 'text', component: Text, blockConfig: expectedConfig },
          ]}
          blockComponent={CustomBlockWrapper}
          onChange={() => {}}
        />
      )
      expect(wrapper.find(CustomBlockWrapper).props().blockConfig).to.equal(expectedConfig)
      expect(wrapper.find(Text).props().blockConfig).to.equal(expectedConfig)
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
        <OyezEditor
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
  })
})
