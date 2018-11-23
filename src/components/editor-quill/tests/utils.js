/**
 * Inspired and used afterwards by looking at React-Quill's tests
 * - https://github.com/zenoamaro/react-quill/blob/92beccc417cf0bec16c902c5b307b6a6971344ea/test/utils.js
 */
import React from 'react'
import { mount } from 'enzyme' // eslint-disable-line
import ReactQuill from 'react-quill'
import { EditorQuill } from '../'

// Export Quill and setup sampleData for the various tests
const { Quill } = ReactQuill
const sampleData = {
  id: 5,
  data: {
    value: ''
  },
  meta: {
    title: 'Input Box'
  },
  type: 'richtext'
}

function ReactQuillNode(props, children) {
  props = Object.assign({ // eslint-disable-line
    modules: { 'toolbar': ['underline', 'bold', 'italic'] },
    formats: ['underline', 'bold', 'italic']
  }, props)

  return React.createElement(
    ReactQuill,
    props,
    children
  )
}

function EditorQuillNode(props) {
  return React.createElement(
    EditorQuill,
    props
  )
}

function mountReactQuill(props, node) {
  return mount(ReactQuillNode(props, node))
}

function mountEditorQuill(props, node) {
  return mount(EditorQuillNode(props, node))
}

function getQuillInstance(wrapper) {
  return wrapper.instance().getEditor()
}

function getReactQuillInstance(wrapper) {
  return wrapper.find(ReactQuill).instance().getEditor()
}

function getQuillDOMNode(wrapper) {
  return wrapper.getDOMNode().querySelector('.ql-editor')
}

function getQuillContentsAsHTML(wrapper) {
  return getQuillDOMNode(wrapper).innerHTML
}

function setReactQuillContentsFromHTML(wrapper, html) {
  const editor = getReactQuillInstance(wrapper)
  return editor.clipboard.dangerouslyPasteHTML(html)
}

function getRenderedEditor(inputHtml = '', onChange = () => { }, blockConfig = undefined) {
  const blockData = Object.assign(sampleData, { data: { value: inputHtml } })
  const wrapper = mountEditorQuill({ block: blockData, onChange, blockConfig })
  return {
    wrapper,
    ReactQuill: wrapper.find(ReactQuill),
    html: getQuillContentsAsHTML(wrapper)
  }
}

module.exports = {
  Quill,
  sampleData,
  mountReactQuill,
  mountEditorQuill,
  getQuillInstance,
  getQuillDOMNode,
  getRenderedEditor,
  getQuillContentsAsHTML,
  setReactQuillContentsFromHTML
}
