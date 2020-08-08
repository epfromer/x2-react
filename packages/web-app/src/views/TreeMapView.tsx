import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import TreeMapECharts from '../components/ECharts/TreeMapECharts'
import TreeMapHighcharts from '../components/Highcharts/TreeMapHighcharts'
import { fetchAndCache, getEmailReceivers, getEmailSenders } from './../store'
import { RootState } from './../store/types'

export default function TreeMapView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const contactsLoading = useSelector(
    (state: RootState) => state.contactsLoading
  )
  const contacts = useSelector((state: RootState) => state.contacts)
  const emailSenders = useSelector((state: RootState) => getEmailSenders(state))
  const emailReceivers = useSelector((state: RootState) =>
    getEmailReceivers(state)
  )

  function handleClick(search: string, value: string) {
    dispatch({ type: 'clearSearch' })
    dispatch({
      type: 'setReduxState',
      key: search,
      value: `(${value})`,
    })
    fetchAndCache('emails')
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
      <button hidden onClick={() => handleClick('foo', 'bar')}>
        handleClickTreeMap
      </button>
    </div>
  )
}
