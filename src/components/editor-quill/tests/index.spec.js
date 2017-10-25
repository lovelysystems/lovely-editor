import React from 'react'
import { render } from 'enzyme'
import { expect } from 'code'
import sinon from 'sinon'

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

  describe('Render Tests', () => {

    it('component renders with Toolbar', () => {
      const wrapper = render(<EditorQuill block={sampleData} onChange={()=>{}} />)
      expect(wrapper.find('.quill')).to.have.length(1)
      expect(wrapper.find('#toolbar-5')).to.have.length(1)
    })

    it('attaches a Quill instance to the component', () => {
      const wrapper = mountReactQuill()
      const quill = getQuillInstance(wrapper)
      expect(quill instanceof Quill).to.equal(true)
    })
  })

  describe('Data Handling Tests', () => {

    beforeEach(() => {
      // we need to disable the Toolbar, otherwhise the test fails
      // due to some render issues. But the toolbar is not tested here anyways
      sinon.stub(EditorQuill.prototype, 'modules').callsFake(() => {
        return {
          toolbar: false
        }
      })
    })

    afterEach(() => {
      EditorQuill.prototype.modules.restore()
    })

    it('ReactQuill has required properties', () => {
      const expectedHtml = '<p><strong>Hello World.</strong></p>'
      const expectedFormats = [
        'header',
        'bold', 'italic', 'underline',
        'list', 'indent'
      ]
      const editor = getRenderedEditor(expectedHtml)
      const { ReactQuill } = editor

      expect(ReactQuill.props().theme).to.equal('snow')
      expect(ReactQuill.props().formats).to.equal(expectedFormats)
      expect(ReactQuill.props().value).to.equal(expectedHtml)
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
      sinon.stub(EditorQuill.prototype, 'modules').callsFake(() => {
        return {
          toolbar: false
        }
      })
    })

    afterEach(() => {
      EditorQuill.prototype.modules.restore()
    })

    it('ReactQuill calls onChange with the new value when EditorQuill inserts html', () => {
      const inHtml = ''
      const insertHtml = '<p>Hello, world!</p>'

      const clock = sinon.useFakeTimers()
      const onChangeSpy = sinon.spy()
      const onChange = (change) => {
        const { data } = change
        expect(data.value).to.equal(insertHtml)
        onChangeSpy()
      }

      const { wrapper } = getRenderedEditor(inHtml, onChange)
      setReactQuillContentsFromHTML(wrapper, insertHtml)
      const html = getQuillContentsAsHTML(wrapper)
      expect(html).to.equal(insertHtml)

      clock.tick(1000) // because of the debounce
      expect(onChangeSpy.called).to.equal(true)
      clock.restore()
    })

    it('component debounces changes', () => {
      const insertHtml = '<p>Hello, world!</p>'
      const clock = sinon.useFakeTimers()
      const onChange = sinon.spy()

      const { wrapper } = getRenderedEditor('', onChange)
      setReactQuillContentsFromHTML(wrapper, insertHtml)

      expect(onChange.called).to.equal(false)
      clock.tick(1000) // because of the debounce
      expect(onChange.called).to.equal(true)
      clock.restore()
    })
  })
})
