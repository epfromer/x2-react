import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import {
  clearSearch,
  fetchAndCache,
  getEmailReceivers,
  getEmailSenders,
  RootState,
  setReduxState,
} from '@x2react/shared'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import BarChartJS from '../components/ChartJS/BarChartJS'
import BarECharts from '../components/ECharts/BarECharts'
import BarHighcarts from '../components/Highcharts/BarHighcharts'
import BarVictory from '../components/Victory/BarVictory'

export default function BarView() {
  const history = useHistory()
  const contactsLoading = useSelector(
    (state: RootState) => state.contactsLoading
  )
  const contacts = useSelector((state: RootState) => state.contacts)
  const emailSenders = useSelector((state: RootState) => getEmailSenders(state))
  const emailReceivers = useSelector((state: RootState) =>
    getEmailReceivers(state)
  )

  function handleClick(key: string, value: string) {
    clearSearch()
    setReduxState(key, `(${value})`)
    fetchAndCache('emails')
    history.push('/SearchView')
  }

  return (
    <div>
      {contactsLoading && <LinearProgress />}
      {contacts && (
        <div>
          <Typography variant="h5">Victory</Typography>
          <BarVictory
            title="Senders"
            search="from"
            data={emailSenders}
            handleClick={handleClick}
          />
          <BarVictory
            title="Receivers"
            search="to"
            data={emailReceivers}
            handleClick={handleClick}
          />
          <Typography variant="h5">Highcharts</Typography>
          <BarHighcarts
            title="Senders"
            search="from"
            data={emailSenders}
            handleClick={handleClick}
          />
          <BarHighcarts
            title="Receivers"
            search="to"
            data={emailReceivers}
            handleClick={handleClick}
          />
          <Typography variant="h5">ChartJS</Typography>
          <BarChartJS
            title="Senders"
            search="from"
            data={emailSenders}
            handleClick={handleClick}
          />
          <BarChartJS
            title="Receivers"
            search="to"
            data={emailReceivers}
            handleClick={handleClick}
          />
          <Typography variant="h5">ECharts</Typography>
          <BarECharts
            title="Senders"
            search="from"
            data={emailSenders}
            handleClick={handleClick}
          />
          <BarECharts
            title="Receivers"
            search="to"
            data={emailReceivers}
            handleClick={handleClick}
          />
        </div>
      )}
      <button hidden onClick={() => handleClick('foo', 'to')}>
        handleClick
      </button>
    </div>
  )
}
