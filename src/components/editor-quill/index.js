import * as React from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'

// Helpers
import { find, get, debounce } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'
import { QuillToolbar } from './toolbar'

// Styling
const classes = new BemHelper('editor-quill')

export class EditorQuill extends React.Component {

  constructor(props, context) {
    super(props, context)

    // this component accepts certain customizations (eg. custom Toolbar). To enable
    // them it expects to get an `additionalProps` property array with an object with
    // the corresponding type of the EditorQuill's block.
    //
    // Note: it is an array, because of the fact, that `additionalProps` is passed
    // to the main <Editor /> component, which passes it to each <EditorBlock />,
    // which will also pass it to each individual editor, like <EditorQuill />
    //
    // Example:
    // props.additionalProps = [{
    //    type: 'richtext'
    //    data: { ... }
    // }]
    //
    // props.block = {
    //    ...
    //    type: 'richtext'
    // }
    //
    // Would mean we will get the data from above and provide it to the component as
    // `this.additionalData`.
    const type = get(props, 'block.type')
    const additionalProps = find(get(props, 'additionalProps', {}), ['type', type]) || {}
    const { data = {} } = additionalProps
    this.additionalData = data

    // when the user wants to hide the toolbar onBlur, we have to update the
    // initial state. hideToolbarOnBlur is one of some customization properties
    this.state = {
      showToolbar: !this.additionalData.hideToolbarOnBlur
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
    const { block, } = this.props
    const { toolbarSelector } = this.additionalData
    return {
      toolbar: {
        container: toolbarSelector || `#toolbar-${block.id}`
      }
    }
  }

  render() {
    const { showToolbar } = this.state
    const { block, } = this.props

    const { hideToolbarOnBlur, placeholderText, toolbar, toolbarCallback, theme } = this.additionalData
    const currentValue = get(block, 'data.value', '')

    // customization
    // - the user can decide to overwrite the existing default toolbar
    // - or the theme of the Editor (to customize it)
    //
    // Note: the user then has to take care of the correct html structures and css
    //       classes to enable the correct react quill toolbar button handling
    const EditorToolbar = toolbar || QuillToolbar
    const selectedTheme = (theme === 'core') ? null : 'snow' // null = will reset theme

    return (
      <div {...classes('container', theme)}>
        <div
          {...classes('toolbar', theme)}
          style={{
            display: showToolbar ? 'inherit': 'none'
          }}
        >
          <EditorToolbar
            id={block.id}
            onToolbarClick={toolbarCallback}
          />
        </div>
        <div {...classes('editor', theme)} >
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
            placeholder={placeholderText || 'Write a text...'}
            theme={selectedTheme}
            value={currentValue}
          />
        </div>
      </div>
    )
  }

}

EditorQuill.propTypes = {
  additionalProps: PropTypes.array,
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
}

EditorQuill.defaultProps = {
  additionalProps: [],
}
