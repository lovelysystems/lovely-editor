import React from 'react'
import { expect } from 'chai'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Component from '../index'

// mocks
import validConfig from './mocks/validConfig.json'

// Enzyme Configuration
Enzyme.configure({ adapter: new Adapter() })

describe('<ExampleImage />', () => {

  it('component renders', () => {
    const wrapper = shallow(
      <Component
        data={validConfig.data}
        meta={validConfig.meta}
        index={0}
        onChange={() => {}}
      />
    )
    expect(wrapper.exists()).to.equal(true)
    expect(wrapper.contains(<h1>Image Block</h1>)).to.equal(true)
  })
})
