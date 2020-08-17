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
  setEmailListPage,
  setQueryOrder,
  setQuerySort,
  setReduxState,
  setAllText,
  setSent,
  setFrom,
  setTo,
  setSubject,
} from '@klonzo/common'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TextField from '@material-ui/core/TextField'
import DateRangeIcon from '@material-ui/icons/DateRange'
import debounce from 'lodash/debounce'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FilterDate from './FilterDate'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

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
          // fetchAndCache('emails')
        }}
        onClose={(date: string, span: number) => {
          setDatePickerOpen(false)
          setReduxState('sent', moment(date).format().slice(0, 10))
          setReduxState('timeSpan', span)
          // fetchAndCache('emails')
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
                onClick={() => {
                  dispatch(setEmailListPage(0))
                  if (querySort === c.field) {
                    dispatch(setQueryOrder(queryOrder === 1 ? -1 : 1))
                  } else {
                    dispatch(setQueryOrder(1))
                  }
                  dispatch(setQuerySort(c.field))
                  getEmailAsync()
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
