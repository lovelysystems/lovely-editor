import * as React from 'react'
import PropTypes from 'prop-types'
import { debounce, get } from 'lodash'
import { UnControlled as CodeMirror } from 'react-codemirror2'

import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('editor-codemirror')

// NOTE: currently only javascript is supported!
require('codemirror/mode/javascript/javascript')

// styling
require('codemirror/lib/codemirror.css')
require('codemirror/theme/material.css')

export class EditorCodeMirror extends React.Component {

  constructor(props) {
    super(props)
    this.onChange = debounce(this.onChangeHandler.bind(this), 300, { maxWait: 1000 })
  }

  onChangeHandler(editor, data, value) {
    const change = {
      data: {
        'value': value
      }
    }

    // gives the changed value back to the EditorWrapper
    this.props.onChange(change)

  }

  render() {
    const { block, blocksConfig } = this.props
    const options = {
      lineNumbers: get(blocksConfig, 'lineNumbers', false),
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
  blocksConfig: PropTypes.shape({
    lineNumbers: PropTypes.bool
  }),
  onChange: PropTypes.func.isRequired
}
EditorCodeMirror.defaultProps = {
  blocksConfig: {}
}
