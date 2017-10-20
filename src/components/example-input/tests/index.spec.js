import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { ExampleInput } from '../'

// mocks
import validConfig from './mocks/validConfig.json'

describe('<ExampleInput />', () => {

  it('component renders', () => {
    const wrapper = shallow(
      <ExampleInput
        data={validConfig.data}
        meta={validConfig.meta}
        id={0}
        onChange={() => {}}
      />
    )
    expect(wrapper.exists()).to.equal(true)
    expect(wrapper.contains(<h1>Input Block</h1>)).to.equal(true)
  })
})
