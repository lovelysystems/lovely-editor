import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { get } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('example-image')

export function ExampleImage(props) {

  const { block } = props
  const title = get(block, 'meta.title', 'Input Block')
  const value = get(block, 'data.value', '')

  return (
    <div {...classes('container')}>
      <h1>{title}</h1>
      <img alt='Hello World' src={value} />
    </div>
  )
}

ExampleImage.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.string).isRequired,
    meta: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
}
