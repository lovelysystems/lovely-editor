import React from 'react'
import { storiesOf } from '@storybook/react' //eslint-disable-line
import { action } from '@storybook/addon-actions' //eslint-disable-line
import withReadme from 'storybook-readme/with-readme' //eslint-disable-line

// Helpers
import { clone, merge } from 'lodash'

// Component imports
import { EditorQuill } from '../..'
import componentReadme from './README.md'

// Example Components for the Storybook
export const customThemeToolbar = function({id}) {
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
          <i className="fa fa-indent fa-rotate-180" style={{paddingTop: 2}} />
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
      block: this.props.block //eslint-disable-line
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
    const { additionalProps } = this.props
    const { block } = this.state

    // must be an array per definition of the additionalProps EditorQuill expects
    const mergedProps = [merge({}, additionalProps, {
      data: {
        toolbarCallback: this.onToolbarAction
      }
    })]

    return (
      <EditorQuill
        block={block}
        onChange={this.onChange}
        additionalProps={mergedProps}
      />
    )
  }

}

storiesOf('Editors/Editor-Quill', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => {
    return (
      <Wrapper block={exampleBlock} />
    )
  })
  .add('default w/ hideToolbarOnBlur', () => {
    const additionalProps = {
      type: 'richtext',
      data: {
        hideToolbarOnBlur: true
      }
    }
    return (
      <Wrapper block={exampleBlock} additionalProps={additionalProps} />
    )
  })
  .add('default w/ custom Toolbar', () => {
    const additionalProps = {
      type: 'richtext',
      data: {
        toolbar: customQuillToolbar,
        toolbarSelector: '#customToolbar'
      }
    }
    return (
      <Wrapper block={exampleBlock} additionalProps={additionalProps} />
    )
  })
  .add('default w/ custom theme and placeholderText', () => {
    const additionalProps = {
      type: 'richtext',
      data: {
        placeholderText: 'Click to write a text...',
        toolbar: customThemeToolbar,
        theme: 'core',
      }
    }
    return (
      <Wrapper block={exampleBlock} additionalProps={additionalProps} />
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
