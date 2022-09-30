import React from 'react'

// Material-UI
import Typography from '@material-ui/core/Typography'

export default ({ editorState = [] }) => (
  <>
    <Typography variant="title" gutterBottom>
      HTML Preview
    </Typography>
    {editorState.map(block => {
      return block.data.value
    })}
  </>
)
