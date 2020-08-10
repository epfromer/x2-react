import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TextField from '@material-ui/core/TextField'
import DateRangeIcon from '@material-ui/icons/DateRange'
import { fetchAndCache, RootState, setReduxState } from '@klonzo/shared'
import debounce from 'lodash/debounce'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import FilterDate from './FilterDate'

var moment = require('moment')

const DEBOUNCE_MS = 1000
const FILTER_DATE = '2000-10-04'

const EmailTableHead: React.FC = () => {
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const querySort = useSelector((state: RootState) => state.querySort)
  const queryOrder = useSelector((state: RootState) => state.queryOrder)
  const from = useSelector((state: RootState) => state.from)
  const to = useSelector((state: RootState) => state.to)
  const subject = useSelector((state: RootState) => state.subject)
  const sent = useSelector((state: RootState) => state.sent)
  const allText = useSelector((state: RootState) => state.allText)
  const timeSpan = useSelector((state: RootState) => state.timeSpan)

  const makeHeadCell = (
    label: string,
    field: string,
    defaultValue: string,
    tabIndex: number
  ) => ({
    label,
    field,
    defaultValue,
    tabIndex,
  })

  const headCells = [
    makeHeadCell('Sent', 'sent', sent, 2),
    makeHeadCell('From', 'from', from, 3),
    makeHeadCell('To', 'to', to, 4),
    makeHeadCell('Subject', 'subject', subject, 5),
  ]

  const debouncedSearch = debounce((field: string, term: string) => {
    setReduxState('emailListPage', 0)
    setReduxState(field, term)
    fetchAndCache('emails')
  }, DEBOUNCE_MS)

  return (
    <>
      <FilterDate
        open={datePickerOpen}
        date={sent ? sent : FILTER_DATE}
        span={timeSpan}
        onClear={() => {
          setDatePickerOpen(false)
          setReduxState('sent', '')
          setReduxState('timeSpan', 0)
          fetchAndCache('emails')
        }}
        onClose={(date: string, span: number) => {
          setDatePickerOpen(false)
          setReduxState('sent', moment(date).format().slice(0, 10))
          setReduxState('timeSpan', span)
          fetchAndCache('emails')
        }}
      />
      <TableHead>
        <TableRow>
          <TableCell colSpan={5}>
            <TextField
              label={'Filter (all text fields)'}
              fullWidth={true}
              variant="filled"
              type="search"
              tabIndex={1}
              defaultValue={allText}
              data-testid="all-text"
              onChange={(e) => debouncedSearch('allText', e.target.value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="clear search"
              data-testid="open-date-picker"
              onClick={() => setDatePickerOpen(true)}
            >
              <DateRangeIcon />
            </IconButton>
          </TableCell>
          {headCells.map((c) => (
            <TableCell key={c.label}>
              <TextField
                label={'Filter ' + c.label}
                type="search"
                variant="filled"
                tabIndex={c.tabIndex}
                defaultValue={c.defaultValue}
                onChange={(e) => debouncedSearch(c.field, e.target.value)}
              />
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          {headCells.map((c) => (
            <TableCell key={c.label}>
              <TableSortLabel
                active={querySort === c.field}
                data-testid={`${c.field}-sort`}
                direction={
                  querySort === c.field
                    ? queryOrder === 1
                      ? 'asc'
                      : 'desc'
                    : 'asc'
                }
                onClick={() => {
                  setReduxState('emailListPage', 0)
                  if (querySort === c.field) {
                    setReduxState('queryOrder', queryOrder === 1 ? -1 : 1)
                  } else {
                    setReduxState('queryOrder', 1)
                  }
                  setReduxState('querySort', c.field)
                  fetchAndCache('emails')
                }}
              >
                {c.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  )
}

export default EmailTableHead
