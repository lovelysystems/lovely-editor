import React from 'react'

// Material-UI
import Typography from '@material-ui/core/Typography'

export default ({editorState=[]}) => (
  <React.Fragment>
    <Typography variant="title" gutterBottom>
      HTML Preview
    </Typography>
    {editorState.map(block => {
      if (block.type === 'tui') {
        return block.data.html
      }
      return block.data.value
    })}
  </React.Fragment>
)
