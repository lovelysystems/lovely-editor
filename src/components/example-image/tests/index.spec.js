import React from 'react'
import { expect } from 'code'
import { shallow } from 'enzyme'
import { ExampleImage } from '../'

// mocks
import validConfig from './mocks/validConfig.json'

describe('<ExampleImage />', () => {

  it('component renders', () => {
    const wrapper = shallow(
      <ExampleImage
        block={validConfig}
        onChange={() => {}}
      />
    )
    expect(wrapper.exists()).to.equal(true)
  })
})
