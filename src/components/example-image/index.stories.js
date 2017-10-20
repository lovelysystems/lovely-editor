import React from 'react'
import { storiesOf } from '@storybook/react' //eslint-disable-line
import { action } from '@storybook/addon-actions' //eslint-disable-line
import withReadme from 'storybook-readme/with-readme' //eslint-disable-line
import componentReadme from './README.md'

storiesOf('Basic Components/Button', module)
  .addDecorator(withReadme(componentReadme))
  .add('with text', () => (
    <button onClick={action('clicked')}>Hello Button</button>
  ))
  .add('full width version', () => (
    <button onClick={action('clicked')}><span role="img" aria-label="emoji">😀 😎 👍 💯</span></button>
  ))
