import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import withReadme from 'storybook-readme/with-readme'

import { Editor, EditorQuill } from '../..'
import componentReadme from './README.md'

// default content of the <Editor />
const editorState = [{
  id: 7,
  type: 'richtext',
  data: {
    value: '<p>Hello World. <strong>This is bold.</strong></p>'
  },
  meta: {
    title: 'Quill Block'
  }
}]

// renders a specific component for the requested block type
const blocksConfig = [
  {
    type: 'richtext',
    component: EditorQuill
  },
]

storiesOf('Editor Components/Editor', module)
  .addDecorator(withReadme(componentReadme))
  .add('default Editor', () => {
    const onChange = (change) => {
      action('onChange')(change)
    }

    return (
      <Editor
        blocksConfig={blocksConfig}
        editorState={editorState}
        onChange={onChange}
      />
    )
  })
