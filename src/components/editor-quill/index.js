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

    // when the user wants to hide the toolbar onBlur, we have to update the
    // initial state. hideToolbarOnBlur is one of some customization properties
    const { customization } = props
    const { hideToolbarOnBlur } = customization

    this.state = {
      showToolbar: !hideToolbarOnBlur
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
    const { block, customization } = this.props
    const { toolbarSelector } = customization
    return {
      toolbar: {
        container: toolbarSelector || `#toolbar-${block.id}`
      }
    }
  }

  render() {
    const { showToolbar } = this.state
    const { block, customization } = this.props
    const { toolbar, toolbarCallback, hideToolbarOnBlur } = customization
    const currentValue = get(block, 'data.value', '')

    // customization: the user can decide to overwrite the existing default toolbar
    // note: the user then has to take care of the correct html structures and css
    //       classes to enable the correct react quill toolbar button handling
    const EditorToolbar = toolbar || QuillToolbar

    return (
      <div {...classes('container')}>
        <div
          {...classes('toolbar')}
          style={{
            display: showToolbar ? 'inherit': 'none'
          }}
        >
          <EditorToolbar
            id={block.id}
            onToolbarClick={toolbarCallback}
          />
        </div>
        <div {...classes('editor')} >
          <ReactQuill
            formats={this.formats()}
            modules={this.modules()}
            onChange={this.onChange}
            onBlur={() => {
              if (hideToolbarOnBlur) {
                this.setState({ showToolbar: false })
              }
            }}
            onFocus={() => {
              if (hideToolbarOnBlur) {
                this.setState({ showToolbar: true })
              }
            }}
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
  customization: PropTypes.shape({
    toolbar: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    toolbarCallback: PropTypes.func,
    toolbarSelector: PropTypes.string,
    hideToolbarOnBlur: PropTypes.bool
  }),
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
}

EditorQuill.defaultProps = {
  customization: {
    toolbar: null,
    toolbarCallback: () => {},
    toolbarSelector: null,
    hideToolbarOnBlur: false
  },
}
