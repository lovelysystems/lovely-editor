import React from 'react'
import { get } from 'lodash'

export default ({editorState={}}) => (
  <React.Fragment>
    <h1>HTML Preview</h1>
    {editorState.map(block => {
      if (block.type === 'richtext') {
        return block.data.value
      } else if (block.type === 'image') {
        return get(block, 'data.src')
          ? `<img src="${get(block, 'data.src')}" class="img-size-${get(block, 'data.size')} img-alignment-${get(block, 'data.alignment')}" title="${get(block, 'data.caption')}"/>`
          : null
      }
      return null
    })}
  </React.Fragment>
)
