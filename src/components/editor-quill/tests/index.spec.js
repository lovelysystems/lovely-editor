import React from 'react'
import { shallow, render } from 'enzyme'
import { expect } from 'code'
import { merge } from 'lodash'
import sinon from 'sinon'
import ReactQuillComp from 'react-quill'

// Components
import { EditorQuill } from '../'

// Utils and Setup
import './setup'
import {
  Quill,
  sampleData,
  mountReactQuill,
  getRenderedEditor,
  getQuillInstance,
  getQuillContentsAsHTML,
  setReactQuillContentsFromHTML
} from './utils'

describe('<EditorQuill />', () => {

  const customQuillToolbar = ({ onToolbarClick }) => { // eslint-disable-line react/prop-types
    const onClick = () => {
      onToolbarClick('Toolbar clicked')
    }

    return (
      <div className="ql-toolbar" id="customToolbar" >
        <button onClick={onClick}>Click Me</button>
      </div>
    )
  }

  const exampleBlockConfig = {
    toolbar: customQuillToolbar,
    toolbarSelector: '#customToolbar'
  }

  describe('Render Tests', () => {

    it('component renders with Toolbar', () => {
      const wrapper = render(
        <EditorQuill
          block={sampleData}
          onChange={() => { }}
        />
      )
      expect(wrapper.find('.quill')).to.have.length(1)
      expect(wrapper.find('#toolbar-5')).to.have.length(1)
    })

    it('component renders with custom theme', () => {
      const customBlockConfig = {
        theme: 'core'
      }
      const wrapper = render(
        <EditorQuill
          blockConfig={customBlockConfig}
          block={sampleData}
          onChange={() => { }}
        />
      )
      expect(wrapper.find('.quill')).to.have.length(1)
      expect(wrapper.find('.ls-editor-quill__toolbar--core')).to.have.length(1)
      expect(wrapper.find('#toolbar-5')).to.have.length(1)
    })

    it('component renders with customToolbar', () => {
      const wrapper = render(
        <EditorQuill
          block={sampleData}
          blockConfig={exampleBlockConfig}
          onChange={() => { }}
        />
      )
      expect(wrapper.find('.quill')).to.have.length(1)
      expect(wrapper.find('#customToolbar')).to.have.length(1)
    })

    it('attaches a Quill instance to the component', () => {
      const wrapper = mountReactQuill()
      const quill = getQuillInstance(wrapper)
      expect(quill instanceof Quill).to.equal(true)
    })
  })

  describe('Data Handling Tests', () => {
    const originalFunc = EditorQuill.prototype.getModules

    beforeEach(() => {
      /**
       * in some tests we need to disable to the toolbar, otherwise the test
       * fails due to some render issues. But if the test explicitly adds a
       * toolbarSelector we let it pass.
       */
      sinon.stub(EditorQuill.prototype, 'getModules').callsFake(props => {
        if (props.blockConfig.toolbarSelector) {
          return originalFunc(props)
        }

        return {
          toolbar: false
        }
      })
    })

    afterEach(() => {
      EditorQuill.prototype.getModules.restore()
    })

    it('ReactQuill has required properties', () => {
      const expectedHtml = '<p><strong>Hello World.</strong></p>'
      const expectedFormats = [
        'header',
        'bold', 'italic', 'underline',
        'list', 'indent'
      ]
      const blockConfig = {
        formats: expectedFormats
      }

      const editor = getRenderedEditor(expectedHtml, () => { }, blockConfig)
      const { ReactQuill } = editor

      expect(ReactQuill.prop('theme')).to.equal('snow')
      expect(ReactQuill.prop('formats')).to.equal(expectedFormats)
      expect(ReactQuill.prop('value')).to.equal(expectedHtml)
      expect(ReactQuill.prop('placeholder')).to.equal('Write a text...')
      expect(ReactQuill.prop('scrollingContainer')).to.equal(undefined)
    })

    it('ReactQuill has required properties and customized ones', () => {
      const customBlockConfig = {
        scrollingContainer: '#some-selector',
        theme: 'core',
        placeholderText: 'custom placeholder'
      }
      const editor = getRenderedEditor('', undefined, customBlockConfig)
      const { ReactQuill } = editor

      expect(ReactQuill.prop('theme')).to.equal(null)
      expect(ReactQuill.prop('placeholder')).to.equal('custom placeholder')
      expect(ReactQuill.prop('scrollingContainer')).to.equal('#some-selector')
    })

    it('ReactQuill can handle custom modules, like custom keybindings', () => {
      const customBlockConfig = {
        ...exampleBlockConfig,
        modules: {
          keyboard: {
            bindings: {
              'list autofill': {
                handler: () => true // example completely disables list autofill
              }
            }
          }
        },
      }

      const wrapper = shallow(
        <EditorQuill
          block={sampleData}
          blockConfig={customBlockConfig}
          onChange={() => { }}
        />
      )

      expect(wrapper.find(ReactQuillComp)).to.have.length(1)
      expect(wrapper.find(ReactQuillComp).prop('modules')).to.equal({
        toolbar: { container: '#customToolbar' },
        keyboard: {
          bindings: {
            'list autofill': {
              handler: customBlockConfig.modules.keyboard.bindings['list autofill'].handler
            }
          }
        }
      })
    })

    it('component can import html', () => {
      const expectedHtml = '<p><strong>Hello World.</strong></p>'
      const { html } = getRenderedEditor(expectedHtml)
      expect(html).to.equal(expectedHtml)
    })

    it('component can import lists (1 level)', () => {
      const expectedHtml = '<ul><li>Hello World.</li></ul>'
      const { html } = getRenderedEditor(expectedHtml)
      expect(html).to.equal(expectedHtml)
    })

    it('component can import nested lists (2 levels)', () => {
      const inputHtml = '<ul><li>Hello World.</li><li><ul><li>How are you?</li></ul></li></ul>'
      const expectedHtml = '<ul><li>Hello World.</li></ul><ul><li class="ql-indent-1">How are you?</li></ul>'
      const { html } = getRenderedEditor(inputHtml)
      expect(html).to.equal(expectedHtml)
    })
  })

  describe('Events Tests', () => {

    beforeEach(() => {
      // we need to disable the Toolbar, otherwhise the test fails
      // due to some render issues. But the toolbar is not tested here anyways
      sinon.stub(EditorQuill.prototype, 'getModules').callsFake(() => {
        return {
          toolbar: false
        }
      })
    })

    afterEach(() => {
      EditorQuill.prototype.getModules.restore()
    })

    it('ReactQuill calls onChange with the new value when EditorQuill inserts html', () => {
      const inHtml = ''
      const insertHtml = '<p>Hello, world!</p>'

      const clock = sinon.useFakeTimers()
      const onChange = sinon.spy()

      const { wrapper } = getRenderedEditor(inHtml, onChange)
      setReactQuillContentsFromHTML(wrapper, insertHtml)
      const html = getQuillContentsAsHTML(wrapper)
      expect(html).to.equal(insertHtml)

      clock.tick(1000) // because of the debounce
      expect(onChange.callCount).to.equal(1)
      expect(onChange.lastCall.args[0].data.value).to.equal(insertHtml)
      clock.restore()
    })

    it('component debounces changes', () => {
      const insertHtml = '<p>Hello, world!</p>'
      const clock = sinon.useFakeTimers()
      const onChange = sinon.spy()

      const { wrapper } = getRenderedEditor('', onChange)
      setReactQuillContentsFromHTML(wrapper, insertHtml)

      expect(onChange.callCount).to.equal(0)
      clock.tick(1000) // because of the debounce
      expect(onChange.callCount).to.equal(1)
      clock.restore()
    })

    it('ReactQuill has required and custom onEvent properties', () => {
      const blockConfig = {
        onBlur: sinon.spy(),
        onFocus: sinon.spy(),
        onKeyDown: sinon.spy(),
        onKeyPress: sinon.spy(),
        onKeyUp: sinon.spy(),
      }

      const editor = getRenderedEditor('', () => { }, blockConfig)
      const { ReactQuill } = editor

      // simulate an event and test if blockConfig funcs where invoked
      ReactQuill.prop('onBlur')(1, 'user', {})
      expect(blockConfig.onBlur.calledOnce).to.equal(true)
      expect(blockConfig.onBlur.calledWith(1, 'user', {})).to.equal(true)

      ReactQuill.prop('onFocus')(1, 'user', {})
      expect(blockConfig.onFocus.calledOnce).to.equal(true)
      expect(blockConfig.onFocus.calledWith(1, 'user', {})).to.equal(true)

      ReactQuill.prop('onKeyDown')({ data: 'some-data' })
      expect(blockConfig.onKeyDown.calledOnce).to.equal(true)
      expect(blockConfig.onKeyDown.calledWith({ data: 'some-data' })).to.equal(true)

      ReactQuill.prop('onKeyPress')({ data: 'some-data' })
      expect(blockConfig.onKeyPress.calledOnce).to.equal(true)
      expect(blockConfig.onKeyPress.calledWith({ data: 'some-data' })).to.equal(true)

      ReactQuill.prop('onKeyUp')({ data: 'some-data' })
      expect(blockConfig.onKeyUp.calledOnce).to.equal(true)
      expect(blockConfig.onKeyUp.calledWith({ data: 'some-data' })).to.equal(true)
    })
  })

  describe('Custom Toolbar Events', () => {
    it('component with a customToolbar can handle toolbarCallback invokes', () => {
      // when the customToolbar wants to transport data (eg. onClick) to the LovelyEditor
      // it can do it with toolbarCallback
      const customBlockConfig = merge({}, exampleBlockConfig, {
        toolbarCallback: sinon.spy()
      })
      const wrapper = shallow(
        <EditorQuill
          block={sampleData}
          blockConfig={customBlockConfig}
          onChange={() => { }}
        />
      )

      expect(wrapper.find(customQuillToolbar)).to.have.length(1)
      wrapper.find(customQuillToolbar).dive().find('button').simulate('click')
      expect(customBlockConfig.toolbarCallback.calledOnce).to.equal(true)
      expect(customBlockConfig.toolbarCallback.calledWith('Toolbar clicked')).to.equal(true)
    })
  })
})
