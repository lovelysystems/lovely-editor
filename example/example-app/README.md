# App Example

These App Example stories will provide some examples on how to use and include the oyez-editor in your application.

## Example App Files

* `block-wrapper.js` => `ExampleBlockWrapper` to hold one `EditorBlock` or multiple  
  - `EditorBlock` => Wrapper around the actual editor to enable/handle certain capabilities like Drag&Drop

* `html-preview.js` => Loop over all editors and returns the generated HTML-Code from their content as one

* `index.js` => responsible for handling
  - the onChange() method
  - the onMenuClick event
  - the Drag&Drop function
  - the rendering of the content


* `config.js` => responsible for handling
  - the default properties of the menu
  - the default properties of each editor
  - the default types of each editor (text, picture, etc.)

## Example Story Setup (Storybook)

* `index.stories.js` => sets the structure of the storybook and what components to add in each single story

```js
storiesOf('App Example', module)
  .addDecorator(withReadme(componentReadme))
  .add('Menu and Quill Block Editor', () => {
    return (
      <App
        document={defaultDocument}
        blocksConfig={defaultBlocksConfig}
        menuState={defaultMenuState}
      />
    )
  })
  .add(...
```
