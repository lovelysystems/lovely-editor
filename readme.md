# Oyez Editor

## Requirements

```
 node 8.6.x
 npm 5.3.x
```

## Setup

Once you have cloned the repository and enter `nvm use && npm install` to
install all the dependencies, required to develop.

## Storybook

This package uses [Storybook](https://storybook.js.org) to showcase the
components. Just enter `npm run storybook` to start it.

The storybook is also available at [https://oyez-editor.netlify.com](https://oyez-editor.netlify.com). Currently only Florian is able to deploy it there.

## How to develop

* `npm run build`: builds the package to ./dist
* `npm run build:storybook`: build static production version of component
  library to ./build/storybook
* `npm run coverage`: runs the tests and reports the coverage with
  [nyc](https://github.com/istanbuljs/nyc)
* `npm run lint`: lints JS code
* `npm run storybook`: run local server with component library and
  [Storybook](https://storybook.js.org)
* `npm run test`: runs the tests (test files path and pattern:
  `src/**/*.spec.js`)
* `npm run test:node`: verifies the installed and used node version

### Pre-commit and Pre-push Hooks

When attempting to commit files in this repository, some taks will
automatically run to ensure a consistently high level of code quality:

* __JavaScript files (.js):__
  * runs `eslint` and automatically fixes auto-fixable issues
    ([see related JS guidelines here](https://github.com/airbnb/javascript))
  * runs `prettier` and auto-formats your code
    ([see what it does here](https://github.com/prettier/prettier))
  * runs all unit tests concerning the committed files with `mocha`

If any of the tasks fail (which means your code does not lint or unit tests are
  failing), your commit or push will be aborted.
