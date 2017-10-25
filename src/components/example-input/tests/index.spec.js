import React from 'react'
import { expect } from 'code'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import { ExampleInput } from '../'

// mocks
import validConfig from './mocks/validConfig.json'

describe('<ExampleInput />', () => {

  describe('Render Tests', () => {
    it('component renders', () => {
      const wrapper = shallow(
        <ExampleInput
          block={validConfig}
          onChange={() => {}}
        />
      )
      expect(wrapper.exists()).to.equal(true)
    })
  })

  describe('Event Tests', () => {
    it('component calls onChange when input changes', () => {
      const expected = { data: { value: 'This is an example Text.' } }

      const onChange = sinon.spy()
      const wrapper = mount(
        <ExampleInput
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
