import { Dialog } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import PrimaryColorPicker from './PrimaryColorPicker'

interface Props {
  open: boolean
  defaultColor: string
  onClose: (c: string) => void
}
export default function ColorPickerDlg({ open, defaultColor, onClose }: Props) {
  // https://material-ui.com/components/dialogs/
  const [pickedColor, setPickedColor] = useState('')

  return (
    <Dialog
      aria-labelledby="filter-date"
      open={open}
      onClose={() => onClose(pickedColor)}
    >
      <Box sx={{ padding: 2 }}>
        <PrimaryColorPicker
          defaultColor={defaultColor}
          onChange={(c: string) => setPickedColor(c)}
        />
      </Box>
    </Dialog>
  )
}
