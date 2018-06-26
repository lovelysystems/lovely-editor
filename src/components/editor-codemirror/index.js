import * as React from 'react'
import PropTypes from 'prop-types'
import { debounce, get } from 'lodash'
import { UnControlled as CodeMirror } from 'react-codemirror2'

import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('editor-codemirror')
require('codemirror/lib/codemirror.css')
require('codemirror/theme/material.css')

// NOTE: currently only javascript is supported!
require('codemirror/mode/javascript/javascript')

export class EditorCodeMirror extends React.Component {

  constructor(props) {
    super(props)
    this.onChange = debounce(this.onChangeHandler.bind(this), 300, { maxWait: 1000 })
  }

  onChangeHandler(editor, data, value) {
    const change = {
      data: {
        value
      }
    }

    // gives the changed value back to the OyezEditor
    this.props.onChange(change)
  }

  render() {
    const { block, blockConfig } = this.props
    const options = {
      lineNumbers: get(blockConfig, 'lineNumbers', false),
      mode: {
        name: 'javascript',
        json: true,
      },
      indentUnit: 2,
      theme: 'default'
    }
    return (
      <div {...classes('container')}>
        <CodeMirror
          value={block.data.value}
          onChange={this.onChange}
          options={options}
        />
      </div>
    )
  }

}

// describes the required properties for the component
EditorCodeMirror.displayName = 'EditorCodeMirror'
EditorCodeMirror.propTypes = {
  block: PropTypes.shape({
    data: PropTypes.object.isRequired
  }).isRequired,
  blockConfig: PropTypes.shape({
    lineNumbers: PropTypes.bool
  }),
  onChange: PropTypes.func.isRequired
}
EditorCodeMirror.defaultProps = {
  blockConfig: {}
}
