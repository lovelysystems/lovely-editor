# Oyez Editor

## Requirements

```
 node 8.6.x
 npm 5.3.x
```

## Setup

Once you have cloned the repository and enter `nvm use && npm install` to install all the dependencies, required to develop.

## Example

Read more about the Example (How to Setup and Start) in the [Example's Readme](example/README.md).

## How to develop

* `npm run lint`: lints JS code
* `npm run test`: runs the tests (test files path and pattern: `src/**/*.spec.js`)
* `npm run test:coverage`: runs the tests and reports the coverage with [Istanbul](https://www.npmjs.com/package/istanbul)
* `npm run test:node`: verifies the installed and used node version

### Pre-commit Hooks

When attempting to commit files in this repository, some taks will automatically run to ensure a consistently high level of code quality:

* __JavaScript files (.js and .jsx):__
  * runs `eslint` and automatically fixes auto-fixable issues ([see related JS guidelines here](https://github.com/airbnb/javascript))
  * runs `prettier` and auto-formats your code ([see what it does here](https://github.com/prettier/prettier))
  * runs all unit tests concerning the committed files with `mocha`

If any of the tasks fail (which means your code does not lint or unit tests are failing), your commit will be aborted.
