import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import NetworkGraphECharts from '../components/ECharts/NetworkGraphECharts'
import NetworkGraphHighcharts from '../components/Highcharts/NetworkGraphHighcharts'
import { fetchAndCache, getEmailSentStats } from './../store'
import { RootState } from './../store/types'

export default function NetworkGraphView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const emailSentStats = useSelector((state: RootState) =>
    getEmailSentStats(state)
  )
  const contactsLoading = useSelector(
    (state: RootState) => state.contactsLoading
  )

  function handleClick(to: string, from: string) {
    if (to && from) {
      dispatch({ type: 'clearSearch' })
      dispatch({ type: 'setReduxState', key: 'to', value: `(${to})` })
      dispatch({ type: 'setReduxState', key: 'from', value: `(${from})` })
      fetchAndCache('emails')
      history.push('/SearchView')
    }
  }

  return (
    <div>
      {contactsLoading && <LinearProgress />}
      {!contactsLoading && (
        <div>
          <Typography variant="h5">Highcharts</Typography>
          <NetworkGraphHighcharts
            title="Email Senders to Receivers"
            data={emailSentStats.data}
            nodes={emailSentStats.nodes}
            handleClick={handleClick}
          />
          <Typography variant="h5">ECharts</Typography>
          <NetworkGraphECharts
            title="Email Senders to Receivers"
            data={emailSentStats.data}
            nodes={emailSentStats.nodes}
            handleClick={handleClick}
          />
        </div>
      )}
    </div>
  )
}
