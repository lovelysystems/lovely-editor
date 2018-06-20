import React from 'react'

export default ({editorState}) => {
  return (
    <div>{editorState.map(block => {
      if(block.type === 'richtext')
        return block.data.value
      else if(block.type === 'image') {
        const html = `<img src="${block.data.src}" class="img-size-${block.data.size} img-alignment-${block.data.alignment}" title="${block.data.caption}"/>`
        return html
      }
      return ''
    })}
    </div>)
}
