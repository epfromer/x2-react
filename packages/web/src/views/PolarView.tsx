import {
  clearSearch,
  getEmailAsync,
  selectContacts,
  selectContactsLoading,
  selectEmailReceivers,
  selectEmailSenders,
  setFrom,
  setTo,
} from '@klonzo/common'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PolarChartJS from '../components/ChartJS/PolarChartJS'
import PolarECharts from '../components/ECharts/PolarECharts'
import PolarHighcharts from '../components/Highcharts/PolarHighcharts'
import PolarVictory from '../components/Victory/PolarVictory'

export default function PolarView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const contactsLoading = useSelector(selectContactsLoading)
  const contacts = useSelector(selectContacts)
  const emailSenders = useSelector(selectEmailSenders)
  const emailReceivers = useSelector(selectEmailReceivers)

  function handleClick(search: string, value: string) {
    dispatch(clearSearch())
    if (search === 'from') {
      dispatch(setFrom(`(${value})`))
    } else {
      dispatch(setTo(`(${value})`))
    }
    getEmailAsync()
    history.push('/SearchView')
  }

  return (
    <div>
      {contactsLoading && <LinearProgress />}
      {contacts && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Highcharts</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <PolarHighcharts
              title="Senders"
              search="from"
              data={emailSenders}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PolarHighcharts
              title="Receivers"
              search="to"
              data={emailReceivers}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">ChartJS</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <PolarChartJS
              title="Senders"
              search="from"
              data={emailSenders}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PolarChartJS
              title="Receivers"
              search="to"
              data={emailReceivers}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">ECharts</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <PolarECharts
              title="Senders"
              search="from"
              data={emailSenders}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PolarECharts
              title="Receivers"
              search="to"
              data={emailReceivers}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Victory</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <PolarVictory
              title="Senders"
              search="from"
              data={emailSenders}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PolarVictory
              title="Receivers"
              search="to"
              data={emailReceivers}
              handleClick={handleClick}
            />
          </Grid>
        </Grid>
      )}
      <button hidden onClick={() => handleClick('foo', 'bar')}>
        handleClick
      </button>
    </div>
  )
}
