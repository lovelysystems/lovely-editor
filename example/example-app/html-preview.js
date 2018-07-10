import React from 'react'

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
      }
      return null
    })}
  </React.Fragment>
)
