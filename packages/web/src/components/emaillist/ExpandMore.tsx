import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => ({
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
}))

export default function ExpandMoreFunc() {
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
        <ExpandMoreIcon />
      </IconButton>
    </Tooltip>
  )
}
