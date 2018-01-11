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
    this.state = {
      showToolbar: false
    }

    // one can import text, html or the raw delta. Related:
    // - https://github.com/quilljs/quill/issues/1088
    this.onChange = debounce(this.onChange.bind(this), 300, { maxWait: 1000 })
  }

  // Event Listeners
  onChange(html) {
    const change = {
      data: {
        value: html,
      }
    }
    this.props.onChange(change)
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
    const { showToolbar } = this.state
    const currentValue = get(block, 'data.value', '')

    return (
      <div {...classes('container')}>
        <div
          {...classes('toolbar')}
          style={{
            display: showToolbar ? 'inherit': 'none'
          }}
        >
          <QuillToolbar
            id={block.id}
          />
        </div>
        <div {...classes('editor')} >
          <ReactQuill
            formats={this.formats()}
            modules={this.modules()}
            onChange={this.onChange}
            onBlur={() => { this.setState({ showToolbar: false }) }}
            onFocus={() => { this.setState({ showToolbar: true }) }}
            placeholder='Write a text...'
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
