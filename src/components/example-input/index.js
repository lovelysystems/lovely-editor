import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { get } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('example-input')

export class ExampleInput extends React.Component {

  onChange(event) {
    const { index } = this.props
    const value = get(event, 'target.value', '')
    const newData = {
      value
    }
    this.props.onChange(newData, index)
  }

  render() {
    const { data, meta } = this.props
    const title = meta.title || 'Image Block'

    return (
      <div {...classes('container')}>
        <h1>{title}</h1>
        <input
          {...classes('content')}
          type="text"
          name="text"
          id="text"
          value={data.value}
          onChange={(event) => this.onChange(event)}
        />
      </div>
    )
  }

}

ExampleInput.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  meta: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
}

ExampleInput.defaultProps = {
  onChange: () => { console.log('... on Change clicked') } //eslint-disable-line
}
