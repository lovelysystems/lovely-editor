import * as React from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'

// Helpers
import { get, debounce } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'
import { QuillToolbar } from './toolbar'

// Styling
const classes = new BemHelper('editor-quill')

export class EditorQuill extends React.Component {

  constructor(props, context) {
    super(props, context)

    // one can import text, html or the raw delta. Related:
    // - https://github.com/quilljs/quill/issues/1088
    this.onChange = debounce(this.onChange.bind(this), 300, { maxWait: 1000 })

    // allows us to handle/access the Quill APIs
    this.quillRef = null      // Quill instance
    this.reactQuillRef = null // ReactQuill component
  }

  // Mounting and attaching
  componentDidMount() {
    this.attachQuillRefs()
    if (!!this.quillRef) {
      this.quillRef.focus()
    }
  }
  componentDidUpdate() {
    this.attachQuillRefs()
  }

  // Event Listeners
  onChange(html) {
    if (!!this.quillRef) {
      const storedContent = this.getContent(html)
      const change = {
        data: {
          value: storedContent.html,
          delta: storedContent.delta
        }
      }
      this.props.onChange(change)
    }
  }
  // format for eg. db
  getContent = (html) => {
    return {
      delta: this.quillRef.getContents(),
      html
    }
  }

  attachQuillRefs = () => {
    if (!this.reactQuillRef || typeof this.reactQuillRef.getEditor !== 'function') return
    this.quillRef = this.reactQuillRef.getEditor()
  }

  // Quill Settings
  formats() {
    // Allowed Formats. Docu: https://quilljs.com/docs/formats/
    return [
      'header',
      'bold', 'italic', 'underline',
      'list', 'indent'
    ]
  }
  modules() {
    // Docu: https://quilljs.com/docs/modules/toolbar/
    const { block } = this.props
    return {
      toolbar: {
        container: `#toolbar-${block.id}`
      }
    }
  }

  render() {
    const { block } = this.props
    const currentValue = get(block, 'data.value', '')

    return (
      <div {...classes('container')}>
        <div {...classes('toolbar')} >
          <QuillToolbar id={block.id} />
        </div>
        <div {...classes('editor')} >
          <ReactQuill
            formats={this.formats()}
            modules={this.modules()}
            onChange={this.onChange}
            placeholder='Write a text...'
            ref={(el) => { this.reactQuillRef = el }}
            theme="snow"
            value={currentValue}
          />
        </div>
      </div>
    )
  }

}

EditorQuill.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired
}
