import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { get } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('example-image')

export function ExampleImage(props, context) {

  const { data, meta } = props
  const title = get(meta, 'title', 'Image Block')

  return (
    <div {...classes('container')}>
      <h1>{title}</h1>
      <img alt='Hello World' src={data.value} />
    </div>
  )
}

ExampleImage.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  meta: PropTypes.objectOf(PropTypes.string).isRequired
}
