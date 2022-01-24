import { Dialog } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import PrimaryColorPicker from './PrimaryColorPicker'

const useStyles = makeStyles({
  root: { margin: '10px' },
})

interface Props {
  open: boolean
  defaultColor: string
  onClose: (c: string) => void
}
export default function ColorPickerDlg({ open, defaultColor, onClose }: Props) {
  // https://material-ui.com/components/dialogs/
  const classes = useStyles()
  const [pickedColor, setPickedColor] = useState('')

  return (
    <Dialog
      aria-labelledby="filter-date"
      className={classes.root}
      open={open}
      onClose={() => onClose(pickedColor)}
    >
      <div className={classes.root}>
        <PrimaryColorPicker
          defaultColor={defaultColor}
          onChange={(c: string) => setPickedColor(c)}
        />
      </div>
    </Dialog>
  )
}
