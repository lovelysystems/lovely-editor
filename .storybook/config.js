import { addParameters, configure } from '@storybook/react';
import { create } from '@storybook/theming'

// load all files in /components that end with .stories.js(x)
const req = require.context('../src/components', true, /\.stories\.js?$/)
const reqExamples = require.context('../example', true, /\.stories\.js?$/)

require('../sass/main.scss')

function loadStories() {
  req.keys().forEach((filename) => req(filename))
  reqExamples.keys().forEach((filename) => reqExamples(filename))
}

addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'Lovely Editor',
      brandUrl: 'https://lovelysystems.com',
    }),
    isFullscreen: false,
    panelPosition: 'right',
    sortStoriesByKind: true,
  },
})

configure(loadStories, module);
