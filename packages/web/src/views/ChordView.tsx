import {
  clearSearch,
  selectContactsLoading,
  selectEmailSentByContact,
  setReduxState,
} from '@klonzo/common'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ChordECharts from '../components/ECharts/ChordECharts'
import ChordHighcharts from '../components/Highcharts/ChordHighcharts'

export default function ChordView() {
  const history = useHistory()
  const emailSentByContact = useSelector(selectEmailSentByContact)
  const contactsLoading = useSelector(selectContactsLoading)

  function handleClick(from: string, to: string) {
    if (!from || !to) return
    clearSearch()
    setReduxState('from', `(${from})`)
    setReduxState('to', `(${to})`)
    // fetchAndCache('emails')
    history.push('/SearchView')
  }

  return (
    <div>
      {contactsLoading && <LinearProgress />}
      {!contactsLoading && (
        <div>
          <Typography variant="h5">Highcharts</Typography>
          <ChordHighcharts
            title="Email Senders to Receivers"
            data={emailSentByContact.data}
            nodes={emailSentByContact.nodes}
            handleClick={handleClick}
          />
          <Typography variant="h5">ECharts</Typography>
          <ChordECharts
            title="Email Senders to Receivers"
            data={emailSentByContact.data}
            nodes={emailSentByContact.nodes}
            handleClick={handleClick}
          />
        </div>
      )}
      <button hidden onClick={() => handleClick('foo', 'bar')}>
        handleClick
      </button>
    </div>
  )
}
