import * as React from 'react'
import PropTypes from 'prop-types'
import { debounce, get } from 'lodash'
import { Controlled as CodeMirror } from 'react-codemirror2'

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

    // create state for cursor to reset it to the correct position after onChange()
    // otherwise it would always jump to the end
    // https://github.com/scniro/react-codemirror2#props-cont-wrapped-codemirror-programming-api
    this.state = {
      value: get(this.props, 'block.data.value')
    }
  }

  onChangeHandler(editor, data, value) {
    const change = {
      data: {
        value
      }
    }

    // gives the changed value back to the LovelyEditor
    this.props.onChange(change)
  }

  render() {
    const { blockConfig } = this.props
    const options = {
      lineNumbers: get(blockConfig, 'lineNumbers', false),
      mode: {
        name: 'javascript',
        json: true,
      },
      indentUnit: 2,
      theme: 'material',
    }
    return (
      <div
        {...classes()}
      >
        <CodeMirror
          value={this.state.value}
          onBeforeChange={(editor, data, value) => {
            this.setState({value})
          }}
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
