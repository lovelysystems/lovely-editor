import * as React from 'react'
import ReactQuill from 'react-quill'
import { CustomToolbar } from './navigation'

// Helpers
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('editor-quill')

export class EditorQuill extends React.Component {

  constructor(props, context) {
    super(props, context)

    // one can import text, html or the raw delta
    this.state = {
      value: this.initState()
    }
    this.onChange = this.onChange.bind(this)

    this.quillRef = null      // Quill instance
    this.reactQuillRef = null // ReactQuill component
  }

  // Mounting and attaching
  componentDidMount() {
    this.attachQuillRefs()
    this.quillRef.focus()
  }
  componentDidUpdate() {
    this.attachQuillRefs()
  }

  // on change
  onChange(html) {
    if (!!this.quillRef) {
      const storedContent = this.getContent(html)
      this.setState({ value: storedContent.html })
    }
  }

  // format for eg. db
  getContent = (value) => {
    const delta = this.quillRef.getContents()
    return {
      delta,
      html: value
    }
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return
    this.quillRef = this.reactQuillRef.getEditor()
  }

  initState() {
    const html = 'Nested List<br /><ul><li>List1</li><li><ul><li>Nested List</li></ul></li></ul><br /><p>Hello World !!! <b class="test-bold"><b class="star">This is bold. </b></b></p>' // https://github.com/quilljs/quill/issues/1088
    return html
  }

  // Docu: https://quilljs.com/docs/modules/toolbar/
  modules() {
    return {
      toolbar: {
        container: '#toolbar'
      }
    }
  }

  // render
  render() {
    return (
      <div {...classes('container')}>
        <CustomToolbar />
        <ReactQuill
          value={this.state.value}
          onChange={this.onChange}
          placeholder='Write a text...'
          modules={this.modules()}
          ref={(el) => { this.reactQuillRef = el }}
        />
      </div>
    )
  }

}
