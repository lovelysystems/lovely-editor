import * as React from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'

// Helpers
import { get } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'
import { CustomToolbar } from './navigation'

// Styling
const classes = new BemHelper('editor-quill')

export class EditorQuill extends React.Component {

  constructor(props, context) {
    super(props, context)

    // one can import text, html or the raw delta. Related:
    // - https://github.com/quilljs/quill/issues/1088
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
      const change = {
        data: {
          value: storedContent.html
        }
      }
      this.props.onChange(change)
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

  // Docu: https://quilljs.com/docs/modules/toolbar/
  modules() {
    const { block } = this.props
    return {
      toolbar: {
        container: `#toolbar-${block.id}`
      }
    }
  }

  // render
  render() {
    const { block } = this.props
    const currentValue = get(block, 'data.value', '')
    return (
      <div {...classes('container')}>
        <CustomToolbar id={block.id} />
        <ReactQuill
          theme="snow"
          value={currentValue}
          onChange={this.onChange}
          placeholder='Write a text...'
          modules={this.modules()}
          ref={(el) => { this.reactQuillRef = el }}
        />
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

EditorQuill.defaultProps = {
  onChange: (change) => { console.log('... on Change triggered', change) } //eslint-disable-line
}
