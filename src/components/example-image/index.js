import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { get } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('example-image')

export function ExampleImage(props) {

  const { block } = props
  const value = get(block, 'data.value', '')

  return (
    <div {...classes('container')}>
      <img alt='Hello World' src={value} />
    </div>
  )
}

ExampleImage.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
}
