import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  clearSearch,
  getCustodiansLoading,
  getEmailAsync,
  getEmailSentByCustodian,
  setFrom,
  setTo,
  store,
} from '../common'
import ChordECharts from '../components/ECharts/ChordECharts'
import ChordHighcharts from '../components/Highcharts/ChordHighcharts'
import LoadingIndicator from '../components/LoadingIndicator'

export default function ChordView() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const emailSentByCustodian = useSelector(getEmailSentByCustodian)
  const custodiansLoading = useSelector(getCustodiansLoading)

  function handleClick(from: string, to: string) {
    if (!from || !to) return
    dispatch(clearSearch())
    dispatch(setFrom(from.slice(0, from.search(/,/))))
    dispatch(setTo(to.slice(0, to.search(/,/))))
    getEmailAsync(store)
    navigate('/SearchView')
  }

  return (
    <div>
      {custodiansLoading && <LoadingIndicator />}
      {!custodiansLoading && (
        <div>
          <Typography variant="h5">Highcharts</Typography>
          <ChordHighcharts
            title="Custodian Interaction"
            data={emailSentByCustodian.data}
            nodes={emailSentByCustodian.nodes}
            handleClick={handleClick}
          />
          <Typography variant="h5">ECharts</Typography>
          <ChordECharts
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
