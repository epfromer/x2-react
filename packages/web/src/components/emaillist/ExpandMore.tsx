import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React, { useState } from 'react'

// implemented as functional component
export default function ExpandMoreFunc() {
  const [rotate, setRotate] = useState(false)

  return (
    <IconButton
      aria-label="expand more"
      onClick={() => setRotate(!rotate)}
      data-testid="expand-more-button"
      className={rotate ? 'rotate open' : 'rotate close'}
    >
      <ExpandMoreIcon />
    </IconButton>
  )
}
