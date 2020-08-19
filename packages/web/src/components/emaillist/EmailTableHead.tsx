import {
  getEmailAsync,
  selectAllText,
  selectFrom,
  selectQueryOrder,
  selectQuerySort,
  selectSent,
  selectSubject,
  selectTimeSpan,
  selectTo,
  setAllText,
  setEmailListPage,
  setFrom,
  setQueryOrder,
  setQuerySort,
  setSent,
  setSubject,
  setTimeSpan,
  setTo,
} from '@klonzo/common'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TextField from '@material-ui/core/TextField'
import DateRangeIcon from '@material-ui/icons/DateRange'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import debounce from 'lodash/debounce'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FilterDate from './FilterDate'

var moment = require('moment')

const DEBOUNCE_MS = 1000
const FILTER_DATE = '2000-10-04'

const EmailTableHead: React.FC = () => {
  const dispatch = useDispatch()
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const querySort = useSelector(selectQuerySort)
  const queryOrder = useSelector(selectQueryOrder)
  const from = useSelector(selectFrom)
  const to = useSelector(selectTo)
  const subject = useSelector(selectSubject)
  const sent = useSelector(selectSent)
  const allText = useSelector(selectAllText)
  const timeSpan = useSelector(selectTimeSpan)

  const makeHeadCell = (
    label: string,
    field: string,
    action: ActionCreatorWithPayload<string, string>,
    defaultValue: string,
    tabIndex: number
  ) => ({
    label,
    field,
    action,
    defaultValue,
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
      getEmailAsync()
    },
    DEBOUNCE_MS
  )

  const onDateClear = () => {
    setDatePickerOpen(false)
    dispatch(setSent(''))
    dispatch(setTimeSpan(0))
    getEmailAsync()
  }

  const onDateClose = (date: string, span: number) => {
    setDatePickerOpen(false)
    dispatch(setSent(moment(date).format().slice(0, 10)))
    dispatch(setTimeSpan(span))
    getEmailAsync()
  }

  const onSort = (field: string) => {
    dispatch(setEmailListPage(0))
    if (querySort === field) {
      dispatch(setQueryOrder(queryOrder === 1 ? -1 : 1))
    } else {
      dispatch(setQueryOrder(1))
    }
    dispatch(setQuerySort(field))
    getEmailAsync()
  }

  // TODO - bug, date doesn't show in input field when set

  return (
    <>
      <FilterDate
        open={datePickerOpen}
        date={sent ? sent : FILTER_DATE}
        span={timeSpan}
        onClear={onDateClear}
        onClose={(date: string, span: number) => onDateClose(date, span)}
      />
      <TableHead>
        <TableRow>
          <TableCell colSpan={5}>
            <button
              hidden
              onClick={onDateClear}
              data-testid="onDateClear"
            ></button>
            <button
              hidden
              onClick={() => onDateClose('2001-10-28T22:00:13.000Z', 2)}
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
                active={querySort === c.field}
                data-testid={`${c.field}-sort`}
                direction={
                  querySort === c.field
                    ? queryOrder === 1
                      ? 'asc'
                      : 'desc'
                    : 'asc'
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
