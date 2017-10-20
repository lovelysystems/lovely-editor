import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'
import { expect } from 'chai'

// Component to Test
import App from '../index'

describe('<App />', () => {

  let component = null

  beforeEach(() => {
    component = ReactTestUtils.renderIntoDocument(<div><App /></div>)
  })

  it('component renders', () => {
    expect(ReactDOM.findDOMNode(component))
  })
})
