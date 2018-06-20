import {EditorQuill, EditorImage, EditorCodeMirror } from '../../src'

// App Config
export const defaultMenuState = {
  meta: {
    title: 'Example-Menu'
  },
  buttons: [
    { action: 'add', text: 'Add Richtext', type: 'richtext', templateId: null },
    { action: 'add', text: 'Add Richtext (Template)', type: 'richtext', templateId: 1 },
    { action: 'add', text: 'Add Image', type: 'image', templateId: null },
    { action: 'add', text: 'Add Image (Template)', type: 'image', templateId: 2 },
  ]
}

export const defaultDocument = {
  template: [{
    id: 1,
    data: {
      value: '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>'
    }
  }, {
    id: 2,
    data: {
      alignment: 'center',
      caption: 'Hello Kevin.',
      size: 'medium',
      src: 'https://media.giphy.com/media/brsEO1JayBVja/giphy.gif'
    }
  }],
  editorState: [{
    id: 3,
    type: 'richtext',
    data: {
      value: '<p>Hello World. <strong>This is bold.</strong></p>'
    },
    meta: {
      title: 'Quill Block'
    }
  }, {
    id: 4,
    type: 'codemirror',
    data: {
      value: 'function helloWorld() {\n\tconsole.log(\'hello world\');\n}\nhelloWorld();'
    },
    meta: {
      title: 'CodeMirror-Editor'
    }
  }]
}

// EDITOR SETUP
export const editorQuillConfig = {
  type: 'richtext',
  component: EditorQuill
}
export const editorImageConfig = {
  type: 'image',
  component: EditorImage
}
export const editorCodeMirrorConfig = {
  type: 'codemirror',
  component: EditorCodeMirror
}

export const defaultBlocksConfig = [
  editorQuillConfig,
  editorImageConfig,
  editorCodeMirrorConfig
]
