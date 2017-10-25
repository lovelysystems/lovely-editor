// Polyfills
// - Docu: https://github.com/zenoamaro/react-quill/blob/92beccc417cf0bec16c902c5b307b6a6971344ea/test/setup.js
import 'jsdom-global/register' // eslint-disable-line
import MutationObserver from './polyfills/MutationObserver'
import getSelection from './polyfills/getSelection'

// "Setup" the Polyfills
MutationObserver(global)
getSelection(global)
