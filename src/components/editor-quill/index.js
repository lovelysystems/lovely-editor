import * as React from 'react'
import PropTypes from 'prop-types'
import ReactQuill, { Quill } from 'react-quill'
import { debounce, forOwn, get, invoke, merge } from 'lodash'

import { BemHelper } from '../../helpers/bem-helper'

import { QuillToolbar } from './toolbar'

// Styling
const classes = new BemHelper('editor-quill')

export class EditorQuill extends React.Component {
  constructor(props, context) {
    super(props, context)

    // this component can be customized (eg. custom toolbar) through the `blockConfig` prop
    // one can import text, html or the raw delta. Related:
    // - https://github.com/quilljs/quill/issues/1088
    this.onChange = debounce(this.onChange.bind(this), 300, { maxWait: 1000 })

    // additionally we register fontawesome icons
    this.registerIcons()

    // register formats and modules _only once_ in the lifetime of this component
    this.formats = this.getFormats(props)
    this.modules = this.getModules(props)
  }

  // Event Listeners
  onChange(html) {
    const { onChange } = this.props

    const change = {
      data: {
        value: html,
      },
    }

    onChange(change)
  }

  /**
   * Quill editor allowed and enabled formats
   * Docs: https://quilljs.com/docs/formats/
   * Example formats: https://quilljs.com/standalone/full/
   *
   * Register custom formats
   * - https://github.com/zenoamaro/react-quill#custom-formats
   * - see also editor-qull/index.stories.js for more examples
   */
  getFormats(props) {
    const { blockConfig = {} } = props
    if (typeof blockConfig.registerFormats === 'function') {
      return blockConfig.registerFormats(Quill)
    }

    // FYI: undefined or null will enable all formats by default
    return blockConfig.formats
  }

  /**
   * Quill modules to attach to editor (eg. toolbar)
   *
   * Docs
   * - https://quilljs.com/docs/modules/
   * - https://github.com/zenoamaro/react-quill#props
   *
   * Keyboard Configuration
   * - https://quilljs.com/docs/modules/keyboard/#configuration
   *
   * Example Toolbar: https://quilljs.com/standalone/full/
   */
  getModules(props) {
    const { block, blockConfig = {} } = props
    const { modules = {}, toolbarSelector, toolbarOptions } = blockConfig

    const customToolbar = {
      container: toolbarSelector || `#toolbar-${block.id}`,
    }

    return merge(
      {},
      {
        toolbar: toolbarOptions || customToolbar,
      },
      modules,
    )
  }

  // customization of the quill editor
  registerIcons() {
    const { blockConfig } = this.props
    if (get(blockConfig, 'icons')) {
      const icons = Quill.import('ui/icons')
      forOwn(blockConfig.icons, (value, key) => {
        // these specialIcons have subsettings (eg. list with ordered, bullet)
        const specialIcons = [
          'align',
          'direction',
          'float',
          'indent',
          'list',
          'script',
        ]
        if (specialIcons.includes(key)) {
          icons[key] = {
            ...icons[key],
            ...value,
          }
        } else {
          icons[key] = value
        }
      })
    }
  }

  renderCustomToolbar() {
    const { block, blockConfig = {} } = this.props
    const { toolbarCallback, toolbarOptions, theme } = blockConfig

    if (toolbarOptions) {
      /**
       * if the user provides toolbarOptions, do not render custom toolbar and
       * use quill's standard toolbar instead
       *
       * example:
       *
       * const toolbarOptions = [
       *   ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
       *   ['blockquote', 'code-block'],
       * ];
       */
      return null
    }

    // Toolbar Customization Note:
    // - the user then has to take care of the correct html structures and css
    //   classes to enable the correct react quill toolbar button handling
    const EditorToolbar = get(blockConfig, 'toolbar') || QuillToolbar

    return (
      <div {...classes('toolbar', theme)}>
        <EditorToolbar id={block.id} onToolbarClick={toolbarCallback} />
      </div>
    )
  }

  render() {
    const { block, blockConfig = {} } = this.props
    const { placeholderText, scrollingContainer, theme } = blockConfig
    const currentValue = get(block, 'data.value', '')
    const selectedTheme = theme === 'core' ? null : 'snow' // null = will reset theme

    return (
      <div {...classes('container', theme)}>
        {this.renderCustomToolbar()}
        <div {...classes('editor', theme)}>
          <ReactQuill
            formats={this.formats}
            modules={this.modules}
            placeholder={placeholderText || 'Write a text...'}
            onBlur={(previousRange, source, editor) => {
              invoke(
                this.props,
                'blockConfig.onBlur',
                previousRange,
                source,
                editor,
              )
            }}
            onFocus={(range, source, editor) => {
              invoke(this.props, 'blockConfig.onFocus', range, source, editor)
            }}
            onChange={this.onChange}
            onKeyDown={event =>
              invoke(this.props, 'blockConfig.onKeyDown', event)
            }
            onKeyPress={event =>
              invoke(this.props, 'blockConfig.onKeyPress', event)
            }
            onKeyUp={event => invoke(this.props, 'blockConfig.onKeyUp', event)}
            theme={selectedTheme}
            value={currentValue}
            scrollingContainer={scrollingContainer}
          />
        </div>
      </div>
    )
  }
}

EditorQuill.propTypes = {
  additionalProps: PropTypes.shape({}),
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  blockConfig: PropTypes.shape({
    formats: PropTypes.arrayOf(PropTypes.string),
    icons: PropTypes.shape({}),
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    placeholderText: PropTypes.string,
    registerFormats: PropTypes.func,
    theme: PropTypes.string,
    toolbar: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    toolbarCallback: PropTypes.func,
  }),
  onChange: PropTypes.func.isRequired,
}

EditorQuill.defaultProps = {
  additionalProps: {},
  blockConfig: {
    onBlur: () => {},
    onFocus: () => {},
    onKeyPress: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    icons: null,
    placeholderText: 'Write a text...',
    registerFormats: null,
    toolbar: QuillToolbar,
    toolbarCallback: () => {},
    toolbarSelector: null,
    theme: 'snow',
  },
}
