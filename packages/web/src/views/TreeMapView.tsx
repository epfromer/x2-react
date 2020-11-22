import {
  clearSearch,
  getEmailAsync,
  getCustodians,
  getCustodiansLoading,
  selectEmailReceivers,
  selectEmailSenders,
  setFrom,
  setTo,
  store,
} from '@klonzo/common'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import TreeMapECharts from '../components/ECharts/TreeMapECharts'
import TreeMapHighcharts from '../components/Highcharts/TreeMapHighcharts'

export default function TreeMapView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const custodiansLoading = useSelector(getCustodiansLoading)
  const custodians = useSelector(getCustodians)
  const emailSenders = useSelector(selectEmailSenders)
  const emailReceivers = useSelector(selectEmailReceivers)

  function handleClick(search: string, value: string) {
    dispatch(clearSearch())
    const name = value.slice(0, value.search(/,/))
    dispatch(search === 'from' ? setFrom(name) : setTo(name))
    getEmailAsync(store)
    history.push('/SearchView')
  }

  return (
    <div>
      {custodiansLoading && <LinearProgress />}
      {custodians && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Highcharts</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TreeMapHighcharts
              title="Senders"
              search="from"
              data={emailSenders}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TreeMapHighcharts
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
            <TreeMapECharts
              title="Senders"
              search="from"
              data={emailSenders}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TreeMapECharts
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
