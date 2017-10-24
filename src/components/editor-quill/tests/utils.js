/**
 * Inspired and used afterwards by looking at the React-Quill solution
 * - https://github.com/zenoamaro/react-quill/blob/92beccc417cf0bec16c902c5b307b6a6971344ea/test/utils.js
 */
import React from 'react'
import { mount, shallow } from 'enzyme' // eslint-disable-line
import ReactQuill from 'react-quill'
import { EditorQuill } from '../'

const { Quill } = ReactQuill // eslint-disable-line

function ReactQuillNode(props, children) {
  props = Object.assign({ // eslint-disable-line
    modules: {'toolbar': ['underline', 'bold', 'italic']},
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

function getQuillDOMNode(wrapper) {
  return wrapper.getDOMNode().querySelector('.ql-editor')
}

function getQuillContentsAsHTML(wrapper) {
  return getQuillDOMNode(wrapper).innerHTML
}

// TODO: use or remove before finishing the PR
function setQuillContentsFromHTML(wrapper, html) {
  const editor = getQuillInstance(wrapper)
  return editor.clipboard.dangerouslyPasteHTML(html)
}

module.exports = {
  Quill,
  mountReactQuill,
  mountEditorQuill,
  getQuillInstance,
  getQuillDOMNode,
  getQuillContentsAsHTML,
  setQuillContentsFromHTML,
}
