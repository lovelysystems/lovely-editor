## TUI EDITOR

Includes the ToastUI-Editor from https://github.com/nhnent/tui.editor

Provides the possibility to convert text Markdown-Language to HTML.

NOTE: This implementation of the TUI-Editor is just a showcase and not a full
implementation with all features and customisation possibilities. We only
implemented a simple version with a couple of basic features. It only supports
the features included in the example down below.

## Data Structure

```js
  data: {
    html: '<h1>Hello World</h1>'
    value: '# Hello World'
  },
```

Note: `data.html` is only used as an output by the TUI editor himself. It cannot
be used as an input. But one gets the html output of the markdown input here.

## Example code

```js
import { EditorTui } from './'

const block = {
  data: {
    value: '# Hello World'
  },
}

class Wrapper extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      block
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(change) {
    const newState = {
      ...this.state.block,
      data: change.data
    }
    this.setState({ block: newState })
  }

  render() {
    return (
      <EditorTui
        block={this.state.block}
        onChange={(change) => this.onChange(change)}
      />
    )
  }
}
```
