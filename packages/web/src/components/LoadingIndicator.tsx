import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  backdrop: { zIndex: theme.zIndex.drawer + 1, color: '#fff' },
}))

export default function LoadingIndicator() {
  const classes = useStyles()
  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
