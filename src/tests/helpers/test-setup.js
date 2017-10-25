import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Documentation "enzyme and jsdom"
// - https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
//
// Examples
// - https://github.com/zenoamaro/react-quill/blob/master/test/setup.js
// - https://semaphoreci.com/community/tutorials/testing-react-components-with-enzyme-and-mocha
import 'jsdom-global/register'

// Enzyme Config
Enzyme.configure({ adapter: new Adapter() })
