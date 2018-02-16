import React from 'react'
import { expect } from 'code'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

// component to test
import { EditorImage } from '../'
import { ImageToolbar } from '../toolbar'

// mocks
import validConfig from './mocks/validConfig.json'

describe('<EditorImage />', () => {

  const CustomToolbar = ({onToolbarClick}) => { // eslint-disable-line react/prop-types
    const onClick = () => {
      onToolbarClick('Toolbar clicked')
    }

    return (
      <div>
        <button onClick={onClick}>Click Me</button>
      </div>
    )
  }

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
      expect(wrapper.find(ImageToolbar).length).to.equal(1)
    })

    it('a component with a custom toolbar', () => {
      const blockConfig = {
        toolbar: CustomToolbar
      }
      const wrapper = shallow(
        <EditorImage
          block={validConfig}
          blockConfig={blockConfig}
          onChange={() => {}}
        />
      )
      expect(wrapper.find(CustomToolbar).length).to.equal(1)
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

    it('toolbarCallback when the custom Toolbar triggers it', () => {
      const blockConfig = {
        toolbar: CustomToolbar,
        toolbarCallback: sinon.spy()
      }
      const wrapper = shallow(
        <EditorImage
          block={validConfig}
          blockConfig={blockConfig}
          onChange={() => {}}
        />
      )

      wrapper.find(CustomToolbar).dive().find('button').simulate('click')
      expect(blockConfig.toolbarCallback.calledOnce).to.equal(true)
      expect(blockConfig.toolbarCallback.calledWith('Toolbar clicked')).to.equal(true)
    })
  })

})

describe('<Toolbar />', () => {

  describe('renders', () => {
    it('a component with six buttons', () => {
      const wrapper = shallow(<ImageToolbar />)
      expect(wrapper.exists()).to.equal(true)
      expect(wrapper.find('button')).to.have.length(6)
    })
  })

})
