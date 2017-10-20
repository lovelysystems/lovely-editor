import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// NOTE
// - https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
// - https://semaphoreci.com/community/tutorials/testing-react-components-with-enzyme-and-mocha
import { JSDOM } from 'jsdom'

const jsdom = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>')
const { window } = jsdom

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop))
  Object.defineProperties(target, props)
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js',
}

copyProps(window, global)

// Enzyme Config
Enzyme.configure({ adapter: new Adapter() })
