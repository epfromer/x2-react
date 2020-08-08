import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TextField from '@material-ui/core/TextField'
import DateRangeIcon from '@material-ui/icons/DateRange'
// @ts-ignore
import debounce from 'lodash/debounce'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAndCache } from '../../store/actions'
import { RootState } from '../../store/types'
import FilterDate from './FilterDate'

var moment = require('moment')

const DEBOUNCE_MS = 1000
const FILTER_DATE = '2000-10-04'

const EmailTableHead: React.FC = () => {
  const dispatch = useDispatch()
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
    dispatch({ type: 'setReduxState', key: 'emailListPage', value: 0 })
    dispatch({ type: 'setReduxState', key: field, value: term })
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
          dispatch({ type: 'setReduxState', key: 'sent', value: '' })
          dispatch({ type: 'setReduxState', key: 'timeSpan', value: 0 })
          fetchAndCache('emails')
        }}
        onClose={(date: string, span: number) => {
          setDatePickerOpen(false)
          dispatch({
            type: 'setReduxState',
            key: 'sent',
            value: moment(date).format().slice(0, 10),
          })
          dispatch({ type: 'setReduxState', key: 'timeSpan', value: span })
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
                  dispatch({
                    type: 'setReduxState',
                    key: 'emailListPage',
                    value: 0,
                  })
                  if (querySort === c.field) {
                    dispatch({
                      type: 'setReduxState',
                      key: 'queryOrder',
                      value: queryOrder === 1 ? -1 : 1,
                    })
                  } else {
                    dispatch({
                      type: 'setReduxState',
                      key: 'queryOrder',
                      value: 1,
                    })
                  }
                  dispatch({
                    type: 'setReduxState',
                    key: 'querySort',
                    value: c.field,
                  })
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
