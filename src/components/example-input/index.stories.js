import React from 'react'
import { storiesOf } from '@storybook/react' //eslint-disable-line
import { action } from '@storybook/addon-actions' //eslint-disable-line
import withReadme from 'storybook-readme/with-readme' //eslint-disable-line

// Component imports
import { ExampleInput } from './'
import componentReadme from './README.md'

const block = {
  id: 5,
  data: {
    value: 'Hello World.'
  }
}

storiesOf('Example Components/Input', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => (
    <ExampleInput
      block={block}
      onChange={action('onChange')}
    />
  ))
