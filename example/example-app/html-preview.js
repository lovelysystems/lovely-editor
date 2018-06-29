import React from 'react'
import { get } from 'lodash'

// Material-UI
import Typography from '@material-ui/core/Typography'

export default ({editorState=[]}) => (
  <React.Fragment>
    <Typography variant="title" gutterBottom>
      HTML Preview
    </Typography>
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
