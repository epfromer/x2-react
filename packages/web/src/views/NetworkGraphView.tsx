import {
  clearSearch,
  getCustodiansLoading,
  getEmailAsync,
  getEmailSentByCustodian,
  setFrom,
  setTo,
  store,
} from '@klonzo/common'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingIndicator from '../components/LoadingIndicator'
import NetworkGraphECharts from '../components/ECharts/NetworkGraphECharts'
import NetworkGraphHighcharts from '../components/Highcharts/NetworkGraphHighcharts'
import { Typography } from '@mui/material'

export default function NetworkGraphView() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const emailSentByCustodian = useSelector(getEmailSentByCustodian)
  const custodiansLoading = useSelector(getCustodiansLoading)

  function handleClick(from: string, to: string) {
    dispatch(clearSearch())
    if (from) {
      dispatch(setFrom(from.slice(0, from.search(/,/))))
    }
    if (to) {
      dispatch(setTo(to.slice(0, to.search(/,/))))
    }
    getEmailAsync(store)
    navigate('/SearchView')
  }

  return (
    <div>
      {custodiansLoading && <LoadingIndicator />}
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
        onClick={() => handleClick('foo', 'bar')}
        data-testid="handle-click"
      ></button>
    </div>
  )
}
