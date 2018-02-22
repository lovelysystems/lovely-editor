# Changelog for Oyez Editor

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and
this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased][1]

- upgrade all node packages to latest version (eg. react-quill to 1.2.4)

## 2018/02/21 [0.2.0][3]

### Added

- EditorQuill: can import and register custom icons for the EditorToolbar (with
  quill's snow theme)

- All levels of the <Editor> components (eg. blocks and editors like quill)
  receive the `additionalProps` property, if it is passed to the <Editor />.
  This property can include additional data for any component.
- each block in the `blocksConfig` can now contain a `data` property, which contains
  customizations for the given block.type.
  - Example customization for the <EditorQuill />
    - whether or not the Toolbar should fade out when the editor lost focus or not
    - replace the editor's Toolbar with a custom one
  - Example customization for the <EditorImage />
    - replace the editor's Toolbar with a custom one

## 2018/02/12 [0.1.0][2]

### Added

- Initial Project Setup with Lint, Test and Bundle Setup
- Basic Editor Components Setup (Editor, EditorBlock and Example Components)
- Storybook implemented to showcase Editor Components
- Quill Editor Component implemented (Basic Setup)
- Editor Image component added (Basic Setup)
- Drag & Drop Support (added and illustrated in Storybook)

[3]: https://github.com/lovelysystems/oyez-editor/releases/tag/v0.2.0
[2]: https://github.com/lovelysystems/oyez-editor/releases/tag/v0.1.0
[1]: https://github.com/lovelysystems/oyez-editor/compare/v0.1.0...HEAD
