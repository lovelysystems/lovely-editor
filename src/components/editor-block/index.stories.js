import React from 'react'
import { storiesOf } from '@storybook/react' //eslint-disable-line
import { action } from '@storybook/addon-actions' //eslint-disable-line
import withReadme from 'storybook-readme/with-readme' //eslint-disable-line

// Component imports
import { EditorBlock, ExampleInput } from '../..'
import componentReadme from './README.md'

const block = {
  id: 5,
  data: {
    value: 'Hello World.'
  },
  meta: {
    titel: 'Input Box'
  }
}

storiesOf('Editor/Editor-Block', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => (
    <EditorBlock
      block={block}
    >
      <ExampleInput
        block={block}
        onChange={action('changed')}
      />
    </EditorBlock>
  ))
