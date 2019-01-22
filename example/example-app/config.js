import { EditorQuill, EditorTui, EditorCodeMirror } from '../../src'

const randomId = () => Math.floor((Math.random() * 1000) + 1)

// EXAMPLE MENU SETUP
export const defaultMenuState = {
  meta: {
    title: 'ExampleApp'
  },
  buttons: [
    { action: 'add', text: 'Add Quill', type: 'richtext', templateId: null },
  ]
}

export const menuWithAllEditors = {
  meta: {
    title: 'ExampleApp with all Editors'
  },
  buttons: [
    { action: 'add', text: 'Add Quill', type: 'richtext', templateId: null },
    { action: 'add', text: 'Add ToastUI', type: 'tui', templateId: null },
    { action: 'add', text: 'Add CodeMirror', type: 'codemirror', templateId: null },
  ]
}

export const templateMenu = {
  meta: {
    title: 'ExampleApp with Templates'
  },
  buttons: [
    { action: 'add', text: 'Add Quill', type: 'richtext', templateId: null },
    { action: 'add', text: 'Add Quill with Template', type: 'richtext', templateId: 1 },
  ]
}

// EDITORSTATE & TEMPLATE SETUP
// - your app could also add default values to the Editors when the user adds new ones.
// - in our example the ExampleMenu has template buttons. The ExampleApp selects then
//   the corresponding template in the list of templates below and adds it as the
//   default value to the new Editor.
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
    id: randomId(),
    type: 'richtext',
    data: {
      value: '<p>Hello World. <strong>This is bold.</strong></p>'
    },
    meta: {
      title: 'Quill Editor'
    }
  }]
}

// EDITORBLOCK SETUP
export const editorQuillConfig = {
  type: 'richtext',
  component: EditorQuill
}
export const editorTuiConfig = {
  type: 'tui',
  component: EditorTui,
  blockConfig: {
    height: '300px'
  }
}
export const editorCodemirrorConfig = {
  type: 'codemirror',
  component: EditorCodeMirror,
}

export const defaultBlocksConfig = [
  editorQuillConfig,
  editorTuiConfig,
  editorCodemirrorConfig
]
