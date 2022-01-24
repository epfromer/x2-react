import { Backdrop, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles({
  backdrop: { color: '#fff' },
})

export default function LoadingIndicator() {
  const classes = useStyles()
  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
