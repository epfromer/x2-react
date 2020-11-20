import DateFnsUtils from '@date-io/date-fns'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers/'
import React, { useState } from 'react'

// TODO - minDate: 1999-07-02, maxDate: 2002-01-30

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
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          autoOk
          orientation="portrait"
          variant="static"
          openTo="date"
          value={filterDate}
          onChange={(d: any) => setFilterDate(d)}
          disableFuture
          animateYearScrolling
        />
      </MuiPickersUtilsProvider>
      <DialogActions>
        <Button
          onClick={onClear}
          data-testid="clear-date-picker"
          color="primary"
        >
          Clear
        </Button>
        <Button
          onClick={() => onClose((filterDate as unknown) as string)}
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
