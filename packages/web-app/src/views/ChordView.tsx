import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ChordECharts from '../components/ECharts/ChordECharts'
import ChordHighcharts from '../components/Highcharts/ChordHighcharts'
import { fetchAndCache, getEmailSentStats } from './../store'
import { RootState } from './../store/types'

export default function ChordView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const emailSentStats = useSelector((state: RootState) =>
    getEmailSentStats(state)
  )
  const contactsLoading = useSelector(
    (state: RootState) => state.contactsLoading
  )

  function handleClick(from: string, to: string) {
    if (!from || !to) return
    dispatch({ type: 'clearSearch' })
    dispatch({ type: 'setReduxState', key: 'from', value: `(${from})` })
    dispatch({ type: 'setReduxState', key: 'to', value: `(${to})` })
    fetchAndCache('emails')
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
            data={emailSentStats.data}
            nodes={emailSentStats.nodes}
            handleClick={handleClick}
          />
          <Typography variant="h5">ECharts</Typography>
          <ChordECharts
            title="Email Senders to Receivers"
            data={emailSentStats.data}
            nodes={emailSentStats.nodes}
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
