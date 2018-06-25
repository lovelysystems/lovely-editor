import React from 'react'
import { expect } from 'code'
import { shallow } from 'enzyme'
import sinon from 'sinon'

// component to test
import { EditorTui } from '../'

// mocks
import validConfig from './mocks/validConfig.json'

describe('<EditorTui />', () => {

  describe('renders', () => {

    beforeEach(() => {
      window.tuiSpy.resetHistory()
    })

    after(() => {
      window.tuiSpy.resetHistory()
    })

    it('a ToastUI component', () => {
      const wrapper = shallow(
        <EditorTui
          block={validConfig}
          onChange={() => {}}
        />
      )

      expect(wrapper.find('#oyez-editor-tui')).to.have.length(1)
    })

    it('a ToastUI component with the correct properties', () => {
      const wrapper = shallow(
        <EditorTui
          block={validConfig}
          blockConfig={{
            someAdditionalProp: 1
          }}
          onChange={() => {}}
        />
      )

      expect(window.tuiSpy.callCount).to.equal(1)
      expect(window.tuiSpy.lastCall.args[0]).to.include({
        initialValue: '# Hello TUI',
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        height: '180px',
        someAdditionalProp: 1
      })
      expect(window.tuiSpy.lastCall.args[0].events.change).to.be.a.function()
    })

    it('a ToastUI component with the correct (including overwritten) properties', () => {
      const wrapper = shallow(
        <EditorTui
          block={validConfig}
          blockConfig={{
            previewStyle: 'tab'
          }}
          onChange={() => {}}
        />
      )

      expect(window.tuiSpy.callCount).to.equal(1)
      expect(window.tuiSpy.lastCall.args[0]).to.include({
        previewStyle: 'tab',
      })
    })
  })

  describe('Behaviour test', () => {

    it('changes trigger this.props.onChange', () => {
      const onChange = sinon.spy()
      const wrapper = shallow(
        <EditorTui
          block={validConfig}
          onChange={onChange}
        />
      )

      const instance = wrapper.instance()
      instance.onChangeHandler()

      expect(onChange.callCount).to.equal(1)
      expect(onChange.lastCall.args[0]).to.include({
        data: {
          value: 'whatever',
          html: '<p>whatever</p>'
        }
      })
    })
  })
})
