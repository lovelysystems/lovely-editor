import * as React from 'react'
import PropTypes from 'prop-types'
import ReactQuill, { Quill } from 'react-quill'

// Helpers
import { debounce, forOwn, get, invoke } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'
import { QuillToolbar } from './toolbar'

// Styling
const classes = new BemHelper('editor-quill')
require('react-quill/dist/quill.snow.css')
require('react-quill/dist/quill.core.css')

export class EditorQuill extends React.Component {

  constructor(props, context) {
    super(props, context)

    // this component can be customized (eg. custom toolbar) through the `blockConfig` prop
    //
    // Example:
    // props.blockConfig = {
    //    hideToolbarOnBlur: true
    // }
    //
    const { blockConfig } = this.props

    // when the user wants to hide the toolbar onBlur, we have to update the
    // initial state. hideToolbarOnBlur is one of some customization properties
    this.state = {
      showToolbar: !get(blockConfig, 'hideToolbarOnBlur', false)
    }

    // one can import text, html or the raw delta. Related:
    // - https://github.com/quilljs/quill/issues/1088
    this.onChange = debounce(this.onChange.bind(this), 300, { maxWait: 1000 })
  }

  componentWillMount() {
    this.registerIcons()
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
    const { block, blockConfig = {} } = this.props
    const { toolbarSelector } = blockConfig
    return {
      toolbar: {
        container: toolbarSelector || `#toolbar-${block.id}`
      }
    }
  }

  // customization of the quill editor
  registerIcons() {
    const { blockConfig } = this.props
    if (get(blockConfig, 'icons')) {
      const icons = Quill.import('ui/icons')
      forOwn(blockConfig.icons, (value, key) => {
        // these specialIcons have subsettings (eg. list with ordered, bullet)
        const specialIcons = ['align', 'direction', 'float', 'indent', 'list', 'script']
        if (specialIcons.includes(key)) {
          icons[key] = {
            ...icons[key],
            ...value
          }
        } else {
          icons[key] = value
        }
      })
    }
  }

  render() {
    const { showToolbar } = this.state
    const { block, blockConfig = {} } = this.props
    const { hideToolbarOnBlur, placeholderText, toolbarCallback, theme } = blockConfig
    const currentValue = get(block, 'data.value', '')

    // Toolbar Customization Note:
    // - the user then has to take care of the correct html structures and css
    //   classes to enable the correct react quill toolbar button handling
    const EditorToolbar = get(blockConfig, 'toolbar') || QuillToolbar
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
            onBlur={(previousRange, source, editor) => {
              invoke(this.props, 'blockConfig.onBlur', previousRange, source, editor)

              if (hideToolbarOnBlur) {
                this.setState({ showToolbar: false })
              }
            }}
            onFocus={(range, source, editor) => {
              invoke(this.props, 'blockConfig.onFocus', range, source, editor)

              if (hideToolbarOnBlur) {
                this.setState({ showToolbar: true })
              }
            }}
            onKeyPress={(event) => invoke(this.props, 'blockConfig.onKeyPress', event)}
            onKeyDown={(event) => invoke(this.props, 'blockConfig.onKeyDown', event)}
            onKeyUp={(event) => invoke(this.props, 'blockConfig.onKeyUp', event)}
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
  additionalProps: PropTypes.object,
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  blockConfig: PropTypes.shape({
    hideToolbarOnBlur: PropTypes.bool,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    icons: PropTypes.object,
    placeholderText: PropTypes.string,
    toolbar: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    toolbarCallback: PropTypes.func,
    theme: PropTypes.string
  }),
  onChange: PropTypes.func.isRequired,
}

EditorQuill.defaultProps = {
  additionalProps: {},
  blockConfig: {
    hideToolbarOnBlur: false,
    onBlur: () => {},
    onFocus: () => {},
    onKeyPress: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    icons: null,
    placeholderText: 'Write a text...',
    toolbar: QuillToolbar,
    toolbarCallback: () => {},
    toolbarSelector: null,
    theme: 'snow'
  }
}
