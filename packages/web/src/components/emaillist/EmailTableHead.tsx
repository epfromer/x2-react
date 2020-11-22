import {
  getDateStr,
  getEmailAsync,
  selectAllText,
  selectFrom,
  selectOrder,
  selectSent,
  selectSort,
  selectSubject,
  selectTo,
  setAllText,
  setEmailListPage,
  setFrom,
  setOrder,
  setSent,
  setSort,
  setSubject,
  setTo,
  store,
} from '@klonzo/common'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import DateRangeIcon from '@material-ui/icons/DateRange'
import HistoryIcon from '@material-ui/icons/History'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import debounce from 'lodash/debounce'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import FilterDate from './FilterDateDlg'

const DEBOUNCE_MS = 1000
const FILTER_DATE = '2000-10-04'

const EmailTableHead: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const sort = useSelector(selectSort)
  const order = useSelector(selectOrder)
  const from = useSelector(selectFrom)
  const to = useSelector(selectTo)
  const subject = useSelector(selectSubject)
  const sent = useSelector(selectSent)
  const allText = useSelector(selectAllText)

  const makeHeadCell = (
    label: string,
    field: string,
    action: ActionCreatorWithPayload<string, string>,
    value: string,
    tabIndex: number
  ) => ({
    label,
    field,
    action,
    value,
    tabIndex,
  })

  const headCells = [
    makeHeadCell('Sent', 'sent', setSent, sent, 2),
    makeHeadCell('From', 'from', setFrom, from, 3),
    makeHeadCell('To', 'to', setTo, to, 4),
    makeHeadCell('Subject', 'subject', setSubject, subject, 5),
  ]

  const debouncedSearch = debounce(
    (action: ActionCreatorWithPayload<string, string>, term: string) => {
      dispatch(setEmailListPage(0))
      dispatch(action(term))
      getEmailAsync(store)
    },
    DEBOUNCE_MS
  )

  const onDateClear = () => {
    setDatePickerOpen(false)
    dispatch(setSent(''))
    getEmailAsync(store)
  }

  const onDateClose = (date: string) => {
    setDatePickerOpen(false)
    dispatch(setSent(getDateStr(new Date(date))))
    getEmailAsync(store)
  }

  const onSort = (field: string) => {
    dispatch(setEmailListPage(0))
    if (sort === field) {
      dispatch(setOrder(order === 1 ? -1 : 1))
    } else {
      dispatch(setOrder(1))
    }
    dispatch(setSort(field))
    getEmailAsync(store)
  }

  return (
    <>
      <FilterDate
        open={datePickerOpen}
        date={sent ? sent : FILTER_DATE}
        onClear={onDateClear}
        onClose={(date: string) => onDateClose(date)}
      />
      <TableHead>
        <TableRow>
          <TableCell>
            <Tooltip title="Search History" aria-label="Search History">
              <IconButton
                aria-label="Search History"
                onClick={() => history.push('/SearchHistoryView')}
              >
                <HistoryIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
          <TableCell colSpan={4}>
            <button
              hidden
              onClick={onDateClear}
              data-testid="onDateClear"
            ></button>
            <button
              hidden
              onClick={() => onDateClose('2001-10-28T22:00:13.000Z')}
              data-testid="onDateClose"
            ></button>
            <TextField
              label={'Filter (all text fields)'}
              fullWidth={true}
              variant="filled"
              type="search"
              tabIndex={1}
              defaultValue={allText}
              data-testid="all-text"
              onChange={(e) => debouncedSearch(setAllText, e.target.value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Tooltip title="Select date" aria-label="Select date range">
              <IconButton
                aria-label="Select date"
                data-testid="open-date-picker"
                onClick={() => setDatePickerOpen(true)}
              >
                <DateRangeIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
          {headCells.map((c) => (
            <TableCell key={c.label}>
              <TextField
                label={'Filter ' + c.label}
                type="search"
                variant="filled"
                tabIndex={c.tabIndex}
                defaultValue={c.value}
                onChange={(e) => debouncedSearch(c.action, e.target.value)}
              />
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          {headCells.map((c) => (
            <TableCell key={c.label}>
              <TableSortLabel
                active={sort === c.field}
                data-testid={`${c.field}-sort`}
                direction={
                  sort === c.field ? (order === 1 ? 'asc' : 'desc') : 'asc'
                }
                onClick={() => onSort(c.field)}
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
