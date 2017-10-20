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
    const title = get(block, 'meta.title', 'Input Block')
    const value = get(block, 'data.value', '')

    return (
      <div {...classes('container')}>
        <h1>{title}</h1>
        <input
          {...classes('content')}
          type="text"
          name="text"
          id={`${block.id}-text`}
          value={value}
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
    meta: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired
}

ExampleInput.defaultProps = {
  onChange: () => { console.log('... on Change clicked') } //eslint-disable-line
}
