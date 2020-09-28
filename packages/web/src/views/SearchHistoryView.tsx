import Typography from '@material-ui/core/Typography'
import React from 'react'

export default function SearchHistoryView() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Search History
      </Typography>
      <button hidden data-testid="save-setting"></button>
    </div>
  )
}
