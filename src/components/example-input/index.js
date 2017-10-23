import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { get } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('example-input')

export class ExampleInput extends React.Component {

  onChange(event) {
    const value = get(event, 'target.value', '')
    const change = {
      data: {
        value
      }
    }
    this.props.onChange(change)
  }

  render() {
    const { block } = this.props
    const currentValue = get(block, 'data.value', '')

    return (
      <div {...classes('container')}>
        <input
          {...classes('content')}
          type="text"
          name={`${block.id}-text`}
          id={`${block.id}-text`}
          value={currentValue}
          onChange={(event) => this.onChange(event)}
        />
      </div>
    )
  }

}

ExampleInput.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired
}

ExampleInput.defaultProps = {
  onChange: () => { console.log('... on Change triggered') } //eslint-disable-line
}
