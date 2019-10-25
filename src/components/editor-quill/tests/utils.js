/**
 * Inspired and used afterwards by looking at React-Quill's tests
 * - https://github.com/zenoamaro/react-quill/blob/92beccc417cf0bec16c902c5b307b6a6971344ea/test/utils.js
 */
import React from 'react'
import { mount } from 'enzyme' // eslint-disable-line
import ReactQuill from 'react-quill'

import { EditorQuill } from '..'

// Export Quill and setup sampleData for the various tests
export const { Quill } = ReactQuill

export const sampleData = {
  id: 5,
  data: {
    value: '',
  },
  meta: {
    title: 'Input Box',
  },
  type: 'richtext',
}

export function ReactQuillNode(props, children) {
  props = Object.assign({ // eslint-disable-line
      modules: { toolbar: ['underline', 'bold', 'italic'] },
      formats: ['underline', 'bold', 'italic'],
    },
    props,
  )

  return React.createElement(ReactQuill, props, children)
}

export function EditorQuillNode(props) {
  return React.createElement(EditorQuill, props)
}

export function mountReactQuill(props, node) {
  return mount(ReactQuillNode(props, node))
}

export function mountEditorQuill(props, node) {
  return mount(EditorQuillNode(props, node))
}

export function getQuillInstance(wrapper) {
  return wrapper.instance().getEditor()
}

export function getReactQuillInstance(wrapper) {
  return wrapper
    .find(ReactQuill)
    .instance()
    .getEditor()
}

export function getQuillDOMNode(wrapper) {
  return wrapper.getDOMNode().querySelector('.ql-editor')
}

export function getQuillContentsAsHTML(wrapper) {
  return getQuillDOMNode(wrapper).innerHTML
}

export function setReactQuillContentsFromHTML(wrapper, html) {
  const editor = getReactQuillInstance(wrapper)
  return editor.clipboard.dangerouslyPasteHTML(html)
}

export function getRenderedEditor(
  inputHtml = '',
  onChange = () => {},
  blockConfig = undefined,
) {
  const blockData = Object.assign(sampleData, { data: { value: inputHtml } })
  const wrapper = mountEditorQuill({ block: blockData, onChange, blockConfig })
  return {
    wrapper,
    ReactQuill: wrapper.find(ReactQuill),
    html: getQuillContentsAsHTML(wrapper),
  }
}

export default {
  Quill,
  sampleData,
  mountReactQuill,
  mountEditorQuill,
  getQuillInstance,
  getQuillDOMNode,
  getRenderedEditor,
  getQuillContentsAsHTML,
  setReactQuillContentsFromHTML,
}
