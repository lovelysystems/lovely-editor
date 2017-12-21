import React from 'react'
import { expect } from 'code'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

// component to test
import { EditorImage } from '../'
import { Toolbar } from '../toolbar'

// mocks
import validConfig from './mocks/validConfig.json'

describe('<EditorImage />', () => {

  describe('renders', () => {
    it('a component with a default image with the given settings (eg. alignment and size)', () => {
      const wrapper = shallow(
        <EditorImage
          block={validConfig}
          onChange={() => {}}
        />
      )
      expect(wrapper.exists()).to.equal(true)
    })

    it('a component with a toolbar', () => {
      const wrapper = shallow(
        <EditorImage
          block={validConfig}
          onChange={() => {}}
        />
      )
      expect(wrapper.find(Toolbar).length).to.equal(1)
    })
  })

  describe('invokes', () => {
    it('onChange when Caption changes', () => {
      const expected = { data: { ...validConfig.data } }
      const onChange = sinon.spy()
      const wrapper = mount(
        <EditorImage
          block={validConfig}
          onChange={onChange}
        />
      )

      wrapper.find('input').simulate('change')
      expect(onChange.callCount).to.equal(1)
      expect(onChange.lastCall.args[0]).to.equal(expected)
    })
  })

})

describe('<Toolbar />', () => {

  describe('renders', () => {
    it('a component with six buttons', () => {
      const wrapper = shallow(<Toolbar />)
      expect(wrapper.exists()).to.equal(true)
      expect(wrapper.find('button')).to.have.length(6)
    })
  })

})
