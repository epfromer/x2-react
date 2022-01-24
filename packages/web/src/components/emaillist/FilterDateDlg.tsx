import DatePicker from '@mui/lab/DatePicker'
import { Button, Dialog, DialogActions, TextField } from '@mui/material'
import { parseISO } from 'date-fns'
import React, { useState } from 'react'

interface Props {
  date: string
  onClose: (date: string) => void
  onClear: () => void
  open: boolean
}
export default function FilterDate({ onClose, onClear, date, open }: Props) {
  const [filterDate, setFilterDate] = useState(new Date(date))

  // https://material-ui-pickers.dev/demo/datepicker
  // https://material-ui.com/components/text-fields/
  // https://material-ui.com/components/dialogs/

  return (
    <Dialog aria-labelledby="filter-date" open={open}>
      <DatePicker
        // autoOk
        orientation="portrait"
        // variant="static"
        // openTo="date"
        value={filterDate}
        minDate={parseISO('1999-07-02')}
        maxDate={parseISO('2002-01-30')}
        onChange={(d: any) => setFilterDate(d)}
        disableFuture
        renderInput={(params) => <TextField {...params} />}
      />
      <DialogActions>
        <Button
          onClick={onClear}
          data-testid="clear-date-picker"
          color="primary"
        >
          Clear
        </Button>
        <Button
          onClick={() => onClose(filterDate as unknown as string)}
          data-testid="ok-date-picker"
          color="primary"
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
