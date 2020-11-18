import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
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
  const [rotate, setRotate] = useState(false)
  const classes = useStyles()

  return (
    <IconButton
      aria-label="expand more"
      onClick={() => setRotate(!rotate)}
      data-testid="expand-more-button"
      className={rotate ? classes.open : classes.close}
    >
      <ExpandMoreIcon />
    </IconButton>
  )
}
