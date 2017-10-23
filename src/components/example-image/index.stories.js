import React from 'react'
import { storiesOf } from '@storybook/react' //eslint-disable-line
import { action } from '@storybook/addon-actions' //eslint-disable-line
import withReadme from 'storybook-readme/with-readme' //eslint-disable-line

// Component imports
import { ExampleImage } from './'
import componentReadme from './README.md'

const block = {
  id: 6,
  data: {
    value: 'https://media.giphy.com/media/brsEO1JayBVja/giphy.gif'
  }
}

storiesOf('Example Components/Image', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => (
    <ExampleImage
      block={block}
    />
  ))
