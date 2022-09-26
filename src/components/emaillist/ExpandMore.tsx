import { ExpandMore } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { useState } from 'react'

export default function ExpandMoreButton() {
  const [open, setOpen] = useState(false)

  return (
    <Tooltip title={open ? 'Close' : 'Open'} aria-label="Open / Close">
      <IconButton
        aria-label="expand more"
        onClick={() => setOpen(!open)}
        data-testid="expand-more-button"
      >
        <ExpandMore />
      </IconButton>
    </Tooltip>
  )
}
