import {
  clearSearch,
  getEmailAsync,
  selectCustodiansLoading,
  selectEmailSentByCustodian,
  setTo,
} from '@klonzo/common'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import NetworkGraphECharts from '../components/ECharts/NetworkGraphECharts'
import NetworkGraphHighcharts from '../components/Highcharts/NetworkGraphHighcharts'

export default function NetworkGraphView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const emailSentByCustodian = useSelector(selectEmailSentByCustodian)
  const custodiansLoading = useSelector(selectCustodiansLoading)

  function handleClick(name: string) {
    if (!name) return
    dispatch(clearSearch())
    dispatch(setTo(name.slice(0, name.search(/,/))))
    getEmailAsync()
    history.push('/SearchView')
  }

  return (
    <div>
      {custodiansLoading && <LinearProgress />}
      {!custodiansLoading && (
        <div>
          <Typography variant="h5">Highcharts</Typography>
          <NetworkGraphHighcharts
            title="Custodian Interaction"
            data={emailSentByCustodian.data}
            nodes={emailSentByCustodian.nodes}
            handleClick={handleClick}
          />
          <Typography variant="h5">ECharts</Typography>
          <NetworkGraphECharts
            title="Custodian Interaction"
            data={emailSentByCustodian.data}
            nodes={emailSentByCustodian.nodes}
            handleClick={handleClick}
          />
        </div>
      )}
      <button
        hidden
        onClick={() => handleClick('foo')}
        data-testid="handle-click"
      ></button>
    </div>
  )
}
