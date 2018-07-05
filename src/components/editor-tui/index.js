import * as React from 'react'
import { debounce, get } from 'lodash'
import PropTypes from 'prop-types'
import Editor from 'tui-editor'
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('editor-tui')
require('codemirror/lib/codemirror.css') // codemirror
require('tui-editor/dist/tui-editor.css') // editor ui
require('tui-editor/dist/tui-editor-contents.css') // editor content
require('highlight.js/styles/github.css') // code block highlight

export class EditorTui extends React.Component {

  constructor(props){
    super(props)
    this.onChange = debounce(this.onChangeHandler.bind(this), 300, { maxWait: 1000 })
    this.editor = null
  }

  // the editor-div must be rendered before the TUI-Editor is initialised, that
  // is why we init it in componentDidMount
  componentDidMount() {
    const { block, blockConfig } = this.props

    this.editor = new Editor({
      el: document.querySelector(`#lovely-editor-tui-${block.id}`),
      initialValue: get(block, 'data.value', false),
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: '180px',
      events: {
        change: this.onChange
      },
      ...blockConfig,
    })
  }

  onChangeHandler() {
    const change = {
      data: {
        value: this.editor.getValue(),
        html: this.editor.getHtml()
      }
    }

    // gives the changed value back to the LovelyEditor
    this.props.onChange(change)
  }

  render() {
    return <div {...classes()} id={`lovely-editor-tui-${this.props.block.id}`} />
  }

}

// describes the required properties for the element
EditorTui.displayName = 'EditorTui'
EditorTui.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.shape({
      html: PropTypes.string, // available onChange, not possible as an input for the Editor
      value: PropTypes.string,
    })
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  blockConfig: PropTypes.shape({
    initialEditType: PropTypes.string,
    previewStyle: PropTypes.string,
    height: PropTypes.string,
  })
}

EditorTui.defaultProps = {
  blockConfig: {}
}
