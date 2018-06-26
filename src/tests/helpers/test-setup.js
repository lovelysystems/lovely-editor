import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

// Documentation "enzyme and jsdom"
// - https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
//
// Examples
// - https://github.com/zenoamaro/react-quill/blob/master/test/setup.js
// - https://semaphoreci.com/community/tutorials/testing-react-components-with-enzyme-and-mocha
import 'jsdom-global/register'

// Enzyme Config
Enzyme.configure({ adapter: new Adapter() })


// Tui-Editor Mock
const mock = require('mock-require')

// keep in mind to reset the spy after using it. eg. `window.tuiSpy.resetHistory();` in the test teardown
window.tuiSpy = sinon.spy()

mock('tui-editor', (opts) => {
  window.tuiSpy(opts)
  return {
    getValue: () => 'whatever',
    getHtml: () => '<p>whatever</p>'
  }
})
