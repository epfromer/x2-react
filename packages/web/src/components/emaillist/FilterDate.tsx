import DateMomentUtils from '@date-io/moment'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers/'
import React, { useState } from 'react'
var moment = require('moment')

interface Props {
  date: string
  onClose: (date: string, span: number) => void
  onClear: () => void
  span: number
  open: boolean
}

export default function FilterDate({
  onClose,
  onClear,
  date,
  span,
  open,
}: Props) {
  const [filterDate, setFilterDate] = useState(new Date(moment(date)))
  const [filterSpan, setFilterSpan] = useState(span)

  // https://material-ui-pickers.dev/demo/datepicker
  // https://material-ui.com/components/text-fields/
  // https://material-ui.com/components/dialogs/

  return (
    <Dialog aria-labelledby="filter-date" open={open}>
      <MuiPickersUtilsProvider utils={DateMomentUtils}>
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
      <TextField
        label={'+/- days'}
        type="number"
        variant="filled"
        defaultValue={filterSpan}
        onChange={(e) => setFilterSpan((e.target.value as unknown) as number)}
        helperText="Time span in number of days around date to include"
        size="small"
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
          onClick={() =>
            onClose(
              (filterDate as unknown) as string,
              filterSpan > 0 ? filterSpan : -filterSpan
            )
          }
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
