import React from 'react'
import { expect } from 'code'
import { shallow } from 'enzyme'
import sinon from 'sinon'

// component to test
import { Controlled as CodeMirror } from 'react-codemirror2'
import { EditorCodeMirror } from '../'

// mocks
import validConfig from './mocks/validConfig.json'

describe('<EditorCodeMirror />', () => {

  describe('renders', () => {
    it('a component with a CodeMirror component', () => {
      const wrapper = shallow(
        <EditorCodeMirror
          block={validConfig}
          onChange={() => {}}
        />
      )
      expect(wrapper.exists()).to.equal(true)
      expect(wrapper.find(CodeMirror).length).to.equal(1)
    })

    it('a CodeMirror component with the correct properties', () => {
      const wrapper = shallow(
        <EditorCodeMirror
          block={validConfig}
          blockConfig={{
            lineNumbers: true
          }}
          onChange={() => {}}
        />
      )

      const codeMirrorProps = wrapper.find(CodeMirror).props()
      expect(codeMirrorProps.value).to.equal('console.log(\'some log\');')
      expect(codeMirrorProps.onChange).to.be.a.function()
      expect(codeMirrorProps.options).to.include({
        lineNumbers: true,
        mode: {
          name: 'javascript',
          json: true,
        },
        indentUnit: 2,
        theme: 'material'
      })
    })

    it('a CodeMirror component with correct default and overwritten properties', () => {
      const wrapper = shallow(
        <EditorCodeMirror
          block={validConfig}
          blockConfig={{
            lineNumbers: false
          }}
          onChange={() => {}}
        />
      )

      const codeMirrorProps = wrapper.find(CodeMirror).props()
      expect(codeMirrorProps.options).to.include({
        lineNumbers: false
      })
    })
  })

  describe('Behaviour test', () => {
    let clock = null

    beforeEach(() => {
      clock = sinon.useFakeTimers()
    })

    afterEach(() => {
      clock.restore()
    })

    it('changes trigger this.props.onChange by calling onChangeHandle directly', () => {
      const onChange = sinon.spy()
      const wrapper = shallow(
        <EditorCodeMirror
          block={validConfig}
          onChange={onChange}
        />
      )

      const instance = wrapper.instance()
      instance.onChangeHandler(null, null, 'mytest')

      expect(onChange.callCount).to.equal(1)
      expect(onChange.lastCall.args[0]).to.include({
        data: {
          value: 'mytest'
        }
      })
    })

    it('changes trigger this.props.onChange', () => {
      const expected = {
        data: {
          value: 'newinput'
        }
      }
      const onChange = sinon.spy()
      const wrapper = shallow(
        <EditorCodeMirror
          block={validConfig}
          onChange={onChange}
        />
      )

      wrapper.find(CodeMirror).props().onChange(null, null, expected.data.value)
      clock.tick(500)
      expect(onChange.callCount).to.equal(1)
      expect(onChange.lastCall.args[0]).to.equal(expected)
    })
  })
})
