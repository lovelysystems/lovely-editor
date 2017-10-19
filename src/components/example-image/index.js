import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('example-image')

// Main App
const ExampleImage = function(props, context) {

  const { data, meta } = props
  const title = meta.title || 'Image Block'

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

export default ExampleImage
