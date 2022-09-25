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
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingIndicator from '../../../../src/components/LoadingIndicator'
import PieChartJS from '../../../../src/components/ChartJS/PieChartJS'
import PieECharts from '../../../../src/components/ECharts/PieECharts'
import PieHighcharts from '../../../../src/components/Highcharts/PieHighcharts'
import PieVictory from '../../../../src/components/Victory/PieVictory'
import { Grid, Typography } from '@mui/material'

export default function PieView() {
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
            <PieHighcharts
              title="Senders"
              search="from"
              data={emailSenders}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PieHighcharts
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
            <PieChartJS
              title="Senders"
              search="from"
              data={emailSenders}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PieChartJS
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
            <PieECharts
              title="Senders"
              search="from"
              data={emailSenders}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PieECharts
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
            <PieVictory
              title="Senders"
              search="from"
              data={emailSenders}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PieVictory
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
        onClick={() => handleClick('foo', 'bar')}
        data-testid="handle-click"
      ></button>
    </div>
  )
}
