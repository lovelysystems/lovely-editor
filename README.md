# LovelyEditor

LovelyEditor is a React component to provide a variety of editors to add to your
app. It also gives you the opportunity to create your own editor and add it to
the component. As a result the edited content will come in the shape of
HTML-code to be added to your page. Each editor will create an independent
result and therefore can be used on its own.

## Table of Contents

* [Features](#features)
* [Examples](#examples)
* [Requirements](#requirements)
* [Installation](#installation)
* [LovelyEditor components](#lovelyeditor-components)
* [Quickstart](#quickstart)
  * [Example App](#example-app)
  * [Editor State](#editor-state)
  * [Editor Config](#editor-config)
  * [LovelyEditor Integration in your App](#lovelyeditor-integration-in-your-app)
  * [How to use the styling from our Showcases](#how-to-use-the-styling-from-our-showcases)
* [How to contribute and develop](#how-to-contribute-and-develop)
* [How to create a release](#how-to-create-a-release)

## Features

* Provides a variety of pre-designed editors: eg. EditorQuill
* design and features are largely customisable: make it your own!
* easy way to create and add your own custom editor or extend existing ones
* use every EditorComponent (eg. EditorQuill) independently without need to
  look out you for the others

## Examples

The following link will provide you with certain examples on how the component
may be used (https://oyez-editor.netlify.com). By selecting one of the options
within "App Example" you will see a variety of possibilities on what you are
able to use the component for. For example within "Menu and Quill Block Editor"
there is an example-menu included to quickly add different editor-types (eg.
Richtext, Images, etc.) to the application. It is also possible to use the
same editor-type several times.

## Requirements

```
node 8.6.x
npm 5.3.x
```

## Installation

```
npm install oyez-editor
```

and import it in your App with:

```js
import { LovelyEditor } from 'oyez-editor'
```

## LovelyEditor components

The LovelyEditor basically consists out of three main components:

1. [LovelyEditor](src/components/oyez-editor)
2. [EditorBlock](src/components/editor-block)
3. Editors (eg. [EditorQuill](src/components/editor-quill))

The `LovelyEditor` rendered components tree looks like this:

```js
<LovelyEditor>
  <EditorBlock>
    // a EditorComponent, eg. <EditorQuill />
  </EditorBlock>
</LovelyEditor>
```

The main entry point in your app is the `LovelyEditor`. Its properties have to
be specified and all necessary `EditorBlock` and `EditorComponent`s are rendered
automatically, based on the [editorState](#editor-state) and
[blocksConfig](#editor-config).

## Quickstart

Follow the [Installation](#installation) first before taking a look at the
following comprehensive example:

### Example App

The following app showcases the usage of the `LovelyEditor` with two configured
Editors (in this case `EditorQuill` and `EditorImage`) and a current `editorState`.
The app itself controls the `LovelyEditor` by not only subscribing to the `LovelyEditor`'s
`onChange` but also by providing it's `editorState` as a property. The changes are
received and the `YourApp`'s `state` updated. This leads to a re-rendering of
the `LovelyEditor` with a new valid editorState. You can find a similar example also
[in our Storybook](https://oyez-editor.netlify.com/?selectedKind=App%20Example&selectedStory=with%20an%20example%20Menu%20and%20EditorQuill%20Block&full=0&addons=1&stories=1&panelRight=0&addonPanel=REACT_STORYBOOK%2Freadme%2Fpanel).

```js
import { LovelyEditor } from 'oyez-editor'

// current state of LovelyEditor
const editorState = [
  {
    id: 2,
    type: 'richtext',
    data: {
      value: '<p>Hello World. <strong>This is bold.</strong></p>'
    },
    meta: {
      title: 'Quill Block'
    }
  },
  {
    id: 4,
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
  }
]

// renders a specific component for the requested block.type
// in this case EditorQuill would be rendered for all blocks of type "richtext"
const editorQuillConfig = {
  type: 'richtext',
  component: EditorQuill
}
const editorImageConfig = {
  type: 'image',
  component: EditorImage
}

// sets which editor component should be rendered for which block.type
const blocksConfig = [editorQuillConfig, editorImageConfig]

class YourApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(change) {
    this.setState({ editorState: change.editorState })
  }

  render() {
    return (
      <LovelyEditor
        blocksConfig={blocksConfig}
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
    )
  }
}
```

### Editor State

To tell the editor it's current state we need to specify the `editorState`.
It is responsible for telling the component which `Editor` gets what kind of
data (eg. current content for the richtext editor).

The function of the `editorState` is, as the name says, to represent the current
state of the `<LovelyEditor />`. That means if you e.g. type in a new text into
a `<EditorQuill />` the `editorState` will change. Your app can access the
current `editorState` by subscribing to the `onChange` property of the `<LovelyEditor />`.

Through this any changes to an Editor (eg. EditorQuill) lead to an onChange event
of the `<LovelyEditor />` and lets you use the change for your own purposes
(eg. validate changes or show "unsaved" messages).

A `editorState` can look similar to:

```js
const editorState = [
  {
    id: 1, // block.id
    type: 'richtext',
    data: {
      value: '<p>Hello World. <strong>This is bold.</strong></p>'
    },
    meta: {
      title: 'Quill Block'
    }
  },
  {
    id: 2,
    type: 'image',
    data: {
      alignment: 'left',
      caption: 'Hello World.',
      size: 'medium',
      src: 'https://picsum.photos/1000/500'
    },
    meta: {
      title: 'Image Block'
    }
  }
]
```

**Attention**: the block.id must be unique! Make sure each block has it's own
individual (it can be random though) id. The id is used to identify each block
with the LovelyEditor.

Note, that each block type (eg. "richtext") in the `editorState` must have a
matching type configuration in the `blocksConfig` to be rendered.

### Editor Config

Then you have to provide a `blocksConfig` configurations. This means telling
the `<Editor />` which `EditorComponent` to use for which specified type (e.g.
`<EditorImage />` for type "image").

But the order and number of currently rendered Editors are specified through
the `editorState` (see [Editor State](#editor-state)).

An example config could look like:

```js
const editorQuillConfig = {
  type: 'richtext',
  component: EditorQuill
}
const editorImageConfig = {
  type: 'image',
  component: EditorImage
}

const blocksConfig = [editorQuillConfig, editorImageConfig]
```

For example we specified one editor with the "richtext"-type and 1 with the
"image"-type in this order in the example editorState above.

* If we would just put in the "richtext" configuration into the `blocksConfig`
  then only the richtext Editor would be rendered.
* If we would just put in the "image" into the `blocksConfig` then the single
  "image"-type Editor would be rendered.
* If we put in both (as in the examples above) first the "richtext"-type Editors
  and then the "image"-type `EditorComponent` (eg. `<EditorImage />`) is rendered.

### LovelyEditor Integration in your App

As a final step we define our App component where we first set the `editorState`
as `this.state` and create an `onChange`-method to sync the changes in the
`<LovelyEditor />` with the `editorState` of the App and set it as the new
state (or do even more if we want to).

```js
class YourApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(change) {
    // get the change from the LovelyEditor and sync the YourApp's state
    this.setState({ editorState: change.editorState })
  }

  //...
}
```

The final step is the `render()`-method for our App component. Here we put in
our `Editor` with its 3 necessary properties (`blocksConfig`, `editorState`
and `onChange`). As we have defined the requirements for those properties we
only have to assign them to the `Editor`.

```js
render() {
  return (
    <LovelyEditor
      blocksConfig={blocksConfig}
      editorState={this.state.editorState}
      onChange={this.onChange}
    />
  )
}
```

The entire code of the example can be found in the [Quickstart](#quickstart) section.

## How to use the styling from our Showcases

If you want to use the same styling like the basic styling in our Storybook,
you have to include the CSS from oyez-editor in your own application.

```CSS
@import "~oyez-editor/sass/oyez-editor";
```

## How to contribute and develop

### Development Setup

Once you have cloned the repository enter `nvm use && npm install` to
install all the dependencies, required to develop.

### Development Scripts

The package comes with the following npm scripts:

* `npm run build`: builds the package to ./dist
* `npm run build:storybook`: build static production version of component
  library to ./build/storybook
* `npm run coverage`: runs the tests and reports the coverage with
  [nyc](https://github.com/istanbuljs/nyc)
* `npm run lint`: lints JS code
* `npm run storybook`: run local server with component library and
  [Storybook](https://storybook.js.org)
* `npm start`: similar to `npm run storybook`
* `npm run test`: runs the tests (test files path and pattern:
  `src/**/*.spec.js`)
* `npm run test:node`: verifies the installed and used node version

### Showcases

This package uses [Storybook](https://storybook.js.org) to showcase the
components. Just enter `npm run storybook` to start it on your local machine or
visit [https://oyez-editor.netlify.com](https://oyez-editor.netlify.com).

### Pre-commit and Pre-push Hooks

When attempting to commit files in this repository, some taks will
automatically run to ensure a consistently high level of code quality:

* **JavaScript files (.js):**
  * runs `eslint` and automatically fixes auto-fixable issues
    ([see related JS guidelines here](https://github.com/airbnb/javascript))
  * runs `prettier` and auto-formats your code
    ([see what it does here](https://github.com/prettier/prettier))
  * runs all unit tests concerning the committed files with `mocha`

If any of the tasks fail (which means your code does not lint or unit tests are
failing), your commit or push will be aborted.

### How to create a release (Deployment)

1. Update [CHANGES](CHANGES.md)

2. Commit it as "prepare release x.y.z"

3. Create a git tag:

```
npm version major | minor | patch
```

This will update the version in packages.json and create a git tag.

4. Push the git tag and changes

```
git push && git push --tags
```

5. Merge release in release branch (eg. `release/x.y`)
