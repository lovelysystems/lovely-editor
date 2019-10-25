import React from 'react'
// Material-UI
import Typography from '@material-ui/core/Typography'

export default ({ editorState = [] }) => (
  <>
    <Typography variant="h5" gutterBottom>
      HTML Preview
    </Typography>
    {editorState.map(block => {
      if (block.type === 'tui') {
        return block.data.html
      }
      return block.data.value
    })}
  </>
)
