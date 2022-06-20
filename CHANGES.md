# Changelog for Lovely Editor

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and
this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased / [2.1.0]

### Changed

- upgraded npm packages to latest available minor version
- loosen npm package version restriction
- move this package to github Packages

## 2022/03/21 [2.0.0]

### Changed

- remove EditorTui
- move dependencies for EditorCodeMirror and EditorQuill to optional dependencies

## 2018/12/17 [1.3.0][13]

### Added

- EditorQuill supports custom parchment formats with `blockConfig.registerFormats`
  - see example in [editor-quill/index.stories.js](./src/components/editor-quill/index.stories.js)

### Changed

- EditorQuill does not render custom toolbar, when `toolbarOptions` is provided
  in the `blockConfig`

### Removed

- Removed `hideToolbarOnBlur` feature of EditorQuill, because of [react-quill/issues/276](https://github.com/zenoamaro/react-quill/issues/276#issuecomment-384618178)

## 2018/12/10 [1.2.0][12]

### Added

- EditorQuill supports `scrollingContainer` property
- EditorQuill supports custom `modules` (eg. custom keybindings) supported by quilljs

### Changed

- changed required node version from >=8.6 to ^8.11
- changed required npm version from >= 5.3 to ^5.5
- changed react version from 16.3.0 to 16.4.2
- upgrade react-quill from 1.3.2 to 1.3.3

## 2018/11/23 [1.1.0][11]

### Added

- EditorQuill allows all formats (supported by quilljs) by default. Can be controlled
  with new `blockConfig` property `formats` (array). Check out available
  formats [here](https://quilljs.com/docs/formats/)
- EditorToolbar of EditorQuill enhanced and more quill formats added

### Changed

- [react-quill](https://github.com/zenoamaro/react-quill) upgraded from 1.2.7 to 1.3.2
- changed `peerDependencies` to only include `react`, as other editors can be customized

## 2018/07/12 [1.0.4][10]

### Changed

- Readme update for npmjs and change LICENCE to Apache License 2.0

## 2018/07/11 [1.0.3][9]

### Changed

- Readme update for npmjs

## 2018/07/11 [1.0.2][9]

### Changed

- remove `font-awesome.min.css` dependency from LovelyEditor scss to example scss

## 2018/07/11 [1.0.0][8]

### Added

- new example editors added: [CodeMirror](https://github.com/scniro/react-codemirror2)
  and [ToastUI Editor](https://github.com/nhnent/tui.editor)
- new storybook examples added

### Changed

- ExampleApp and related components moved to [/example](example) folder
- EditorQuill comes with two themes now: quill.snow.css and quill.core.css

*BREAKING*

- relocated Delete-Button from `EditorBlock` to `ExampleBlockWrapper`:
  `Delete--Button` will not be included in `LovelyEditor` itself anymore
  - therefore `onBlockAction` function relocated from `</LovelyEditor />` to `<ExampleApp />`
- new name for the Editor: `<Editor />` becomes `<LovelyEditor />`
  - changed all css classnames, react component names and comments starting like
    "oyez-" or "oy-" to either "lovely-" or "ls-"
- new blockConfig structure, pass additional customizations via new `blockConfig`
  property to an Editor. See an example with EditorQuill below:

previous:

```
const blockConfig = {
  type: 'richtext',
  component: EditorQuill,
  data: {
    // blockconfig for the EditorQuill
  }
}
```

now:

```
const blockConfig = {
  type: 'richtext',
  component: EditorQuill,
  blockConfig: {
    // blockconfig for the EditorQuill
  }
}
```

### Removed

- *BREAKING*: `EditorImage` removed
- ExampleApp does not contain example for `EditorImage` anymore

## 2018/05/23 [0.4.2][7]

### Changed

* EditorImage: custom Toolbar receives `onChange` property

## 2018/05/22 [0.4.1][6]

### Added

* EditorImage can work with a custom Editor component

## 2018/04/26 [0.4.0][5]

### Added

* added `react` with version 16.2.0 as a peerDependency

### Changed

* Upgraded react-beautiful-dnd [from 4.0.1 to 6.0.2](https://github.com/atlassian/react-beautiful-dnd/releases/tag/v6.0.2)

### Removed

* Removed `react-beautiful-dnd` peerDependency, as it is only required in the Storybook
  presentation, but not for the core oyez-editor product

## 2018/04/11 [0.3.0][4]

### Added

* Added new event listeners to ReactQuill: onKeyPress, onKeyDown, onKeyUp

### Changed

* ReactQuill invokes onBlur, OnFocus and other events to the provided `blockConfig.onBlur`
  etc. functions
* upgrade all node packages to latest version (eg. react-quill to 1.2.7)

## 2018/02/21 [0.2.0][3]

### Added

* EditorQuill: can import and register custom icons for the EditorToolbar (with
  quill's snow theme)

* All levels of the <Editor> components (eg. blocks and editors like quill)
  receive the `additionalProps` property, if it is passed to the <Editor />.
  This property can include additional data for any component.
* each block in the `blocksConfig` can now contain a `data` property, which contains
  customizations for the given block.type.
  * Example customization for the <EditorQuill />
    * whether or not the Toolbar should fade out when the editor lost focus or not
    * replace the editor's Toolbar with a custom one
  * Example customization for the <EditorImage />
    * replace the editor's Toolbar with a custom one

## 2018/02/12 [0.1.0][2]

### Added

* Initial Project Setup with Lint, Test and Bundle Setup
* Basic Editor Components Setup (Editor, EditorBlock and Example Components)
* Storybook implemented to showcase Editor Components
* Quill Editor Component implemented (Basic Setup)
* Editor Image component added (Basic Setup)
* Drag & Drop Support (added and illustrated in Storybook)

[1]: https://github.com/lovelysystems/oyez-editor/compare/v1.2.0...HEAD
[2]: https://github.com/lovelysystems/oyez-editor/releases/tag/v0.1.0
[3]: https://github.com/lovelysystems/oyez-editor/compare/v0.1.0...v0.2.0
[4]: https://github.com/lovelysystems/oyez-editor/compare/v0.2.0...v0.3.0
[5]: https://github.com/lovelysystems/oyez-editor/compare/v0.3.0...v0.4.0
[6]: https://github.com/lovelysystems/oyez-editor/compare/v0.4.0...v0.4.1
[7]: https://github.com/lovelysystems/oyez-editor/compare/v0.4.1...v0.4.2
[8]: https://github.com/lovelysystems/oyez-editor/compare/v0.4.2...v1.0.0
[9]: https://github.com/lovelysystems/oyez-editor/compare/v1.0.0...v1.0.2
[10]: https://github.com/lovelysystems/oyez-editor/compare/v1.0.2...v1.0.4
[11]: https://github.com/lovelysystems/oyez-editor/compare/v1.0.4...v1.1.0
[12]: https://github.com/lovelysystems/oyez-editor/compare/v1.1.0...v1.2.0
[13]: https://github.com/lovelysystems/oyez-editor/compare/v1.2.0...v1.3.0
