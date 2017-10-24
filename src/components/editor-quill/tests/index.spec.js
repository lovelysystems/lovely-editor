import React from 'react'
import { render } from 'enzyme'
import { expect } from 'code'
import sinon from 'sinon'

// Components
import { EditorQuill } from '../'

// Utils
import {
  Quill,
  mountReactQuill,
  mountEditorQuill,
  getQuillInstance,
  getQuillContentsAsHTML
} from './utils'

// Polyfills
// - Docu: https://github.com/zenoamaro/react-quill/blob/92beccc417cf0bec16c902c5b307b6a6971344ea/test/setup.js)
require('jsdom-global')()
require('./polyfills/MutationObserver.js')(global)
require('./polyfills/getSelection.js')(global)

const runHtmlTest = ((blockData, expectedHtml) => {
  const wrapper = mountEditorQuill({block: blockData, onChange: () => {}})
  const editorHtml = getQuillContentsAsHTML(wrapper)
  expect(editorHtml).to.equal(expectedHtml)
})

describe('<EditorQuill />', () => {

  // Default Test-Data
  const block = {
    id: 5,
    data: {
      value: ''
    },
    meta: {
      title: 'Input Box'
    }
  }

  // Class tests
  it('component renders with Toolbar', () => {
    const wrapper = render(<EditorQuill block={block} onChange={()=>{}} />)
    expect(wrapper.find('.quill')).to.have.length(1)
    expect(wrapper.find('#toolbar-5')).to.have.length(1)
  })

  it('attaches a Quill instance to the component', () => {
    const wrapper = mountReactQuill()
    const quill = getQuillInstance(wrapper)
    expect(quill instanceof Quill).to.equal(true)
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

    it('component can import html', () => {
      const expectedHtml = '<p><strong>Hello World.</strong></p>'
      const blockData = Object.assign(block, { data: { value: expectedHtml } })
      runHtmlTest(blockData, expectedHtml)
    })

    it('component can import lists (1 level)', () => {
      const expectedHtml = '<ul><li>Hello World.</li></ul>'
      const blockData = Object.assign(block, { data: { value: expectedHtml } })
      runHtmlTest(blockData, expectedHtml)
    })

    it('component can import nested lists (2 levels)', () => {
      const inputHtml = '<ul><li>Hello World.</li><li><ul><li>How are you?</li></ul></li></ul>'
      const expectedHtml = '<ul><li>Hello World.</li></ul><ul><li class="ql-indent-1">How are you?</li></ul>'
      const blockData = Object.assign(block, { data: { value: inputHtml } })
      runHtmlTest(blockData, expectedHtml)
    })

    it('component sends onChange events to Wrapper')
  })
})
