## CODEMIRROR EDITOR

Includes the CodeMirror-Editor from https://github.com/scniro/react-codemirror2

NOTE: This implementation of the CodeMirror-Editor is just a showcase and not a
full implementation with all features and customisation possibilities. We only
implemented a simple version with a couple of basic features. It only supports
the features included in the example shown below.

## Data Structure

```js
  data: {
    value: 'function helloWorld() {\n\tconsole.log(\'hello world\');\n}\nhelloWorld();'
  },
```

## Example Code

```js
import { EditorCodeMirror } from './'

const block = {
  data: {
    value: 'console.log(\'hello\');' // currently only javascript is supported
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
      <EditorCodeMirror
        block={this.state.block}
        onChange={(change) => this.onChange(change)}
      />
    )
  }
}
```
