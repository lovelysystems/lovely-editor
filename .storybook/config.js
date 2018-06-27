import { configure } from '@storybook/react';
const { setOptions } = require('@storybook/addon-options');

// load all files in /components that end with .stories.js(x)
const req = require.context('../src/components', true, /\.stories\.js?$/)
const reqExamples = require.context('../example', true, /\.stories\.js?$/)

require('../sass/main.scss')

function loadStories() {
  req.keys().forEach((filename) => req(filename))
  reqExamples.keys().forEach((filename) => reqExamples(filename))
}

setOptions({
  name: 'Oyez Editor',
  sortStoriesByKind: true,
  url: '#',
  showAddonPanel: true
});

configure(loadStories, module);
