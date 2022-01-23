import {
  clearSearch,
  getCustodians,
  getCustodiansLoading,
  getEmailAsync,
  getEmailReceivers,
  getEmailSenders,
  setFrom,
  setTo,
  store,
} from '@klonzo/common'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingIndicator from '../components/LoadingIndicator'
import BarChartJS from '../components/ChartJS/BarChartJS'
import BarECharts from '../components/ECharts/BarECharts'
import BarHighcarts from '../components/Highcharts/BarHighcharts'
import BarVictory from '../components/Victory/BarVictory'
import { Grid } from '@material-ui/core'

export default function BarView() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const custodiansLoading = useSelector(getCustodiansLoading)
  const custodians = useSelector(getCustodians)
  const emailSenders = useSelector(getEmailSenders)
  const emailReceivers = useSelector(getEmailReceivers)

  function handleClick(search: string, value: string) {
    dispatch(clearSearch())
    const name = value.slice(0, value.search(/,/))
    dispatch(search === 'from' ? setFrom(name) : setTo(name))
    getEmailAsync(store)
    navigate('/SearchView')
  }

  return (
    <div>
      {custodiansLoading && <LoadingIndicator />}
      {custodians && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Highcharts</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <BarHighcarts
              title="Senders"
              search="from"
              data={emailSenders}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <BarHighcarts
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
            <BarChartJS
              title="Senders"
              search="from"
              data={emailSenders}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <BarChartJS
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
            <BarECharts
              title="Senders"
              search="from"
              data={emailSenders}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <BarECharts
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
            <BarVictory
              title="Senders"
              search="from"
              data={emailSenders}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <BarVictory
              title="Receivers"
              search="to"
              data={emailReceivers}
              handleClick={handleClick}
            />
          </Grid>
        </Grid>
      )}
      <button
        hidden
        onClick={() => handleClick('foo', 'to')}
        data-testid="handle-click"
      ></button>
    </div>
  )
}
