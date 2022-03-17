import React from 'react'
import { storiesOf } from '@storybook/react' //eslint-disable-line
import { action } from '@storybook/addon-actions' //eslint-disable-line
import withReadme from 'storybook-readme/with-readme' //eslint-disable-line
import PropTypes from 'prop-types'

// Helpers
import { clone, merge } from 'lodash'

// Component imports
import { EditorQuill } from '../..'
import componentReadme from './README.md'

// Example Components for the Storybook
export const customThemeToolbar = function({ id }) {
  return (
    <div className="ql-toolbar" id={`toolbar-${id}`} >
      <select className="ql-header" defaultValue="">
        <option selected disabled>Choose here</option>
        <option value="">Paragraph</option>
        <option value="1">Header 1</option>
        <option value="2">Header 2</option>
        <option value="3">Header 3</option>
      </select>
      <button className="ql-bold">
        <i className="fa fa-bold" />
      </button>
      <button className="ql-italic">
        <i className="fa fa-italic" />
      </button>
      <button className="ql-underline">
        <i className="fa fa-underline" />
      </button>
      <span className="ql-formats">
        <button className="ql-list" value="ordered">
          <i className="fa fa-list-ol" />
        </button>
        <button className="ql-list" value="bullet">
          <i className="fa fa-list-ul" />
        </button>
        <button className="ql-indent" value="-1">
          <i className="fa fa-indent fa-rotate-180" style={{ paddingTop: 2 }} />
        </button>
        <button className="ql-indent" value="+1">
          <i className="fa fa-indent" />
        </button>
      </span>
    </div>
  )
}

const customQuillToolbar = (props) => {

  const onClick = () => {
    if (typeof props.onToolbarClick === 'function') {
      props.onToolbarClick('customQuillToolbar >> Toolbar clicked')
    }
  }

  return (
    <div className="ql-toolbar" id="customToolbar" >
      <select className="ql-header" defaultValue="">
        <option value="1" />
        <option value="2" />
        <option value="3" />
        <option value="" />
      </select>
      <button
        onClick={onClick}
        style={{
          color: '#fff',
          width: 'auto',
          backgroundColor: '#0065cc'
        }}
      >
        Click Me
      </button>
    </div>
  )
}

const exampleBlock = {
  id: 5,
  data: {
    value: ''
  },
  meta: {
    title: 'Input Box'
  },
  type: 'richtext'
}

class Wrapper extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      block: props.block
    }
    this.onChange = this.onChange.bind(this)
    this.onToolbarAction = this.onToolbarAction.bind(this)
  }

  onToolbarAction(toolbarAction) {
    action('onToolbarAction')(toolbarAction)
  }

  onChange(change) {
    const newState = clone(this.state.block)
    newState.data = change.data
    action('onChange')(change)
    this.setState({ block: newState })
  }

  render() {
    const { blockConfig = {} } = this.props
    const { block } = this.state

    const finalBlockConfig = merge({}, blockConfig, {
      toolbarCallback: this.onToolbarAction
    })

    return (
      <EditorQuill
        block={block}
        blockConfig={finalBlockConfig}
        onChange={this.onChange}
      />
    )
  }

}

Wrapper.propTypes = {
  block: PropTypes.shape({
    data: PropTypes.object.isRequired
  }).isRequired,
}

storiesOf('Editors/EditorQuill', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => {
    return (
      <Wrapper block={exampleBlock} />
    )
  })
  .add('without auto formatting lists', () => {
    /**
     * Quill formats inputs with the following pattern "1. " automatically and
     * creates a list. So without this custom keybinding it is not possible to
     * enter "30. " as quill will return a ordered list starting with "1.".
     * See https://github.com/quilljs/quill/issues/2408 for more details.
     * 
     * To resolve this behaviour one could either reset it completely with:
     *    handler: () => true
     * or apply it only when the user enters "1. " but not "2. " (and other numbers)
     *    prefix: /^\s*?(1+\.|-|\*|\[ ?\]|\[x\])$/,
     */
    const blockConfig = {
      modules: {
        keyboard: {
          bindings: {
            'list autofill': {
              handler: () => true // completely disables list autofill
            }
          }
        }
      }
    }

    return (
      <Wrapper block={exampleBlock} blockConfig={blockConfig} />
    )
  })
  .add('with onBlur, onFocus, onKeyPress, onKeyDown and onKeyUp events', () => {
    const blockConfig = {
      onBlur: action('onBlur'),
      onFocus: action('onFocus'),
      onKeyPress: action('onKeyPress'),
      onKeyDown: action('onKeyDown'),
      onKeyUp: action('onKeyUp')
    }
    return (
      <Wrapper block={exampleBlock} blockConfig={blockConfig} />
    )
  })
  .add('with custom toolbar icons', () => {
    const blockConfig = {
      icons: {
        bold: '<i class="fa fa-bold" aria-hidden="true"></i>',
        italic: '<i class="fa fa-italic" aria-hidden="true"></i>',
        underline: '<i class="fa fa-underline" aria-hidden="true"></i>',
        list: {
          bullet: '<i class="fa fa-list-ul"></i>',
          ordered: '<i class="fa fa-list-ol"></i>',
        },
        indent: {
          '+1': '<i class="fa fa-indent" aria-hidden="true"></i>',
          '-1': '<i class="fa fa-indent fa-rotate-180" style="padding-top: 2px;" />'
        },
        customFormat: '<i class="fa fa-pencil"/>'
      },
      toolbar: ({ id }) => (
        (
          <div className="ql-toolbar" id={`toolbar-${id}`} >
            <span className="ql-formats">
              <button className="ql-bold" />
              <button className="ql-italic" />
              <button className="ql-underline" />
            </span>
            <span className="ql-formats">
              <button className="ql-list" value="ordered" />
              <button className="ql-list" value="bullet" />
              <button className="ql-indent" value="-1" />
              <button className="ql-indent" value="+1" />
              <button className="ql-customFormat" />
            </span>
          </div>
        )
      )
    }
    return (
      <Wrapper block={exampleBlock} blockConfig={blockConfig} />
    )
  })
  .add('with custom Toolbar', () => {
    const blockConfig = {
      toolbar: customQuillToolbar,
      toolbarSelector: '#customToolbar'
    }
    return (
      <Wrapper block={exampleBlock} blockConfig={blockConfig} />
    )
  })
  .add('with core theme, placeholderText and custom Toolbar', () => {
    const blockConfig = {
      placeholderText: 'Click to write a text...',
      toolbar: customThemeToolbar,
      theme: 'core',
    }
    return (
      <Wrapper block={exampleBlock} blockConfig={blockConfig} />
    )
  })
  .add('with imported data', () => {
    const contentBock = {
      id: 5,
      data: {
        value: '<p>Nested List</p><ul><li>List1</li><li class="ql-indent-1">Nested List</li></ul><p><br></p><p>Hello World. <strong>This is bold.</strong></p>'
      },
      meta: {
        title: 'Input Box'
      }
    }
    return (
      <Wrapper block={contentBock} />
    )
  })
  .add('with imported nested list', () => {
    const contentBock = {
      id: 5,
      data: {
        value: `<ul>
                  <li>Coffee</li>
                  <li>Tea
                    <ul>
                    <li>Black tea</li>
                    <li>Green tea</li>
                    </ul>
                  </li>
                  <li>Milk</li>
                </ul>`
      },
      meta: {
        title: 'Input Box'
      }
    }
    return (
      <Wrapper block={contentBock} />
    )
  })
  .add('with all available formats', () => {
    const contentBock = {
      id: 5,
      data: {
        value: `
          <h1>H1</h1><h3>H2</h3><h3>H3</h3><p>Normal</p>
          <br>
          <p><strong>Bold</strong></p><p><em>Italic</em></p><p><u>Underlined</u></p>
          <br>
          <ul><li>List #1</li><li class="ql-indent-1">Listitem 1</li><li>List #2</li><li class="ql-indent-1">Listitem 1</li></ul>
          <br>
          <ol><li>List #1</li><li class="ql-indent-1">Listitem 2</li><li>List #2</li><li class="ql-indent-1">Listitem 1</li></ol>`
      },
      meta: {
        title: 'Input Box'
      }
    }
    return (
      <Wrapper block={contentBock} />
    )
  })
  .add('with custom parchment styling', () => {
    /**
     * inspired by
     * - https://stackoverflow.com/a/52851287/1238150
     * - https://stackoverflow.com/a/38723167/1238150 (complex example)
     * - https://codepen.io/natterstefan/pen/xmZvxe
     * - https://codepen.io/natterstefan/pen/zyrxzO
     */
    const blockConfig = {
      registerFormats: Quill => {
        const Inline = Quill.import('blots/inline')
        const icons = Quill.import('ui/icons')

        class SpanBlock extends Inline {

          static create() {
            const node = super.create()
            node.setAttribute('class', 'custom-inline-class')
            return node
          }

          static formats() {
            return true
          }
        } // eslint-disable-line

        SpanBlock.blotName = 'customFormat'
        SpanBlock.tagName = 'span'
        SpanBlock.className = 'custom-inline-class'

        // https://quilljs.com/docs/api/#register
        Quill.register('formats/customFormat', SpanBlock)

        // https://github.com/quilljs/quill/blob/develop/ui/icons.js
        icons.customFormat = icons.background

        // register allowed formats
        return ['bold', 'italic', 'underline', 'strike', 'customFormat']
      },
      toolbarOptions: [
        ['bold', 'italic', 'underline', 'strike'],
        ['customFormat'],
        ['clean'],
      ]
    }

    const contentBock = {
      id: 5,
      data: {
        value: '<p><span class="custom-inline-class">This span has a custom class applied.</span></p><p>Click on the background button to apply the styling or remove it.</p>'
      },
      meta: {
        title: 'Input Box'
      }
    }

    return (
      <Wrapper block={contentBock} blockConfig={blockConfig} />
    )
  })
