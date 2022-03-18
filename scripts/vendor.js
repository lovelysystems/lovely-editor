/* eslint-disable import/no-extraneous-dependencies */
/**
 * One can also import only certain css files of the provided editors in an app.
 */
const shell = require('shelljs')

shell.mkdir('-p', 'dist/styles')
 
// Editor-Quill
shell.mkdir('-p', 'dist/styles/editor-quill')
shell.cp(
  'node_modules/react-quill/dist/quill.core.css',
  'node_modules/react-quill/dist/quill.snow.css',
  'dist/styles/editor-quill/',
)
 
// Editor-Codemirror
shell.mkdir('-p', 'dist/styles/editor-codemirror')
shell.cp(
  'node_modules/codemirror/lib/codemirror.css',
  'node_modules/codemirror/theme/material.css',
  'dist/styles/editor-codemirror/',
)