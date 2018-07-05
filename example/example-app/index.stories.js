import React from 'react'
import { merge } from 'lodash'
import { storiesOf } from '@storybook/react'
import withReadme from 'storybook-readme/with-readme'

// Components
import App from './'
import ExampleBlockWrapper from './block-wrapper'
import componentReadme from './README.md'

// Configuration of the App (eg. default editorState)
import {
  defaultMenuState,
  menuWithAllEditorsExceptImage,
  templateMenu,
  menuWithAllEditors,
  defaultDocument,
  defaultBlocksConfig,
  editorQuillConfig,
  editorImageConfig
} from './config'

// Editor Placeholder examples
const Placeholder = () => (<div>Drag and Drop an Editor from the Menu here to start.</div>)

/**
 * The actual Storybook Stories are created here with the data from above
 */
storiesOf('App Example', module)
  .addDecorator(withReadme(componentReadme))
  .add('with an example Menu and EditorQuill Block', () => {
    return (
      <App
        document={defaultDocument}
        blocksConfig={defaultBlocksConfig}
        menuState={defaultMenuState}
      />
    )
  })
  .add('with an example Menu and an empty Lovely-Editor', () => {
    const newDocument = {
      ...defaultDocument,
      editorState: []
    }
    return (
      <App
        document={newDocument}
        blocksConfig={defaultBlocksConfig}
        menuState={defaultMenuState}
        placeholder={Placeholder}
      />
    )
  })
  .add('with all available Editors', () => {
    const randomId = () => Math.floor((Math.random() * 1000) + 1)
    const newDocument = {
      ...defaultDocument,
      editorState: [
        ...defaultDocument.editorState,
        {
          id: randomId(),
          type: 'image',
          data: {
            alignment: 'left',
            caption: 'Hello World.',
            size: 'medium',
            src: 'https://picsum.photos/1000/500'
          },
          meta: {
            title: 'Input Block'
          }
        },
        {
          id: randomId(),
          type: 'tui',
          data: {
            value: '```js\nfunction helloWorld() {\n\tconsole.log(\'hello world\');\n}\nhelloWorld();```'
          },
          meta: {
            title: 'TUI-Editor'
          }
        },
        {
          id: randomId(),
          type: 'codemirror',
          data: {
            value: 'function helloWorld() {\n\tconsole.log(\'hello world\');\n}\nhelloWorld();'
          },
          meta: {
            title: 'CodeMirror-Editor'
          }
        }
      ]
    }
    return (
      <App
        document={newDocument}
        blocksConfig={defaultBlocksConfig}
        menuState={menuWithAllEditors}
      />
    )
  })

storiesOf('App Example/Customization', module)
  .addDecorator(withReadme(componentReadme))
  .add('with a customized example EditorBlock with Drag&Drop Support', () => {
    const randomId = () => Math.floor((Math.random() * 1000) + 1)
    const newDocument = {
      ...defaultDocument,
      editorState: [
        ...defaultDocument.editorState,
        {
          id: randomId(),
          type: 'tui',
          data: {
            value: '```js\nfunction helloWorld() {\n\tconsole.log(\'hello world\');\n}\nhelloWorld();```'
          },
          meta: {
            title: 'TUI-Editor'
          }
        },
        {
          id: randomId(),
          type: 'codemirror',
          data: {
            value: 'function helloWorld() {\n\tconsole.log(\'hello world\');\n}\nhelloWorld();'
          },
          meta: {
            title: 'CodeMirror-Editor'
          }
        }
      ]
    }
    return (
      <App
        document={newDocument}
        blocksConfig={defaultBlocksConfig}
        blockComponent={ExampleBlockWrapper}
        menuState={menuWithAllEditorsExceptImage}
      />
    )
  })
  .add('with a custom blockConfig for the EditorQuill (eg. hidden Toolbar)', () => {
    const editorQuillCustomConfig = merge({}, editorQuillConfig, {
      blockConfig: {
        hideToolbarOnBlur: true
      }
    })
    const blocksConfig = [editorQuillCustomConfig, editorImageConfig]
    return (
      <App
        document={defaultDocument}
        blocksConfig={blocksConfig}
        menuState={defaultMenuState}
      />
    )
  })

storiesOf('App Example/Content', module)
  .addDecorator(withReadme(componentReadme))
  .add('with HTML Preview of the content of all Editors', () => {
    return (
      <App
        document={defaultDocument}
        blocksConfig={defaultBlocksConfig}
        menuState={defaultMenuState}
        showPreview
      />
    )
  })

storiesOf('App Example/Templates', module)
  .addDecorator(withReadme(componentReadme))
  .add('with an ExampleMenu with Template Buttons', () => {
    return (
      <App
        document={defaultDocument}
        blocksConfig={defaultBlocksConfig}
        menuState={templateMenu}
      />
    )
  })
