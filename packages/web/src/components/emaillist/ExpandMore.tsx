import { ExpandMore } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'

const useStyles = makeStyles({
  close: {
    transition: `300ms transform`,
  },
  open: {
    animation: `spin 300ms`,
    transform: `rotate(180deg)`,
  },
  '@keyframes spin': {
    '0%': {
      transform: `rotate(0deg)`,
    },
    '100%': {
      transform: `rotate(180deg)`,
    },
  },
})

export default function ExpandMoreButton() {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  return (
    <Tooltip title={open ? 'Close' : 'Open'} aria-label="Open / Close">
      <IconButton
        aria-label="expand more"
        onClick={() => setOpen(!open)}
        data-testid="expand-more-button"
        className={open ? classes.open : classes.close}
      >
        <ExpandMore />
      </IconButton>
    </Tooltip>
  )
}
