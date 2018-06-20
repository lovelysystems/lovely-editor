import * as React from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
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
    const { block } = this.props
    const options = {
      // TODO:
      // add 'lineNumbers' as a property and set it to 'false' in story with the following note:
      // ==> needs to be false, otherwise storybook cannot handle mounting/rendering it correctly (but works in other envs)
      lineNumbers: false,
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
    id: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired
  // TODO: add blocksConfig
}
