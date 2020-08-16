import {
  clearSearch,
  Contact,
  fetchAndCache,
  RootState,
  selectDarkMode,
  setReduxState,
} from '@klonzo/common'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import Tooltip from '@material-ui/core/Tooltip'
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle'
import SwapVerticalCircleIcon from '@material-ui/icons/SwapVerticalCircle'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartTimeline from 'highcharts/modules/timeline'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

HighchartTimeline(Highcharts)

// http://content.time.com/time/specials/packages/article/0,28804,2021097_2023262_2023247,00.html
// https://www.tampabay.com/archive/2006/01/29/enron-a-timeline/
// https://www.myplainview.com/news/article/A-chronology-of-Enron-Corp-8499449.php
// https://business.nmsu.edu/~dboje/enron/chronology.htm
// https://www.econcrises.org/2016/12/07/enron-corporation-2001/

export default function EventTimelineView() {
  const history = useHistory()
  const contactsLoading = useSelector(
    (state: RootState) => state.contactsLoading
  )
  const contacts = useSelector((state: RootState) => state.contacts)
  const darkMode = useSelector(selectDarkMode)
  const [vertical, setVertical] = useState(true)

  const getContactColor = (name: string) => {
    const found = contacts?.find((c: Contact) => c.name === name)
    return found ? found.color : ''
  }

  function toggleVertical() {
    setVertical(!vertical)
  }

  function handleClick(key: string, value: string) {
    if (!key) return
    clearSearch()
    setReduxState(key, value)
    fetchAndCache('emails')
    history.push('/SearchView')
  }

  const config: any = {
    chart: {
      type: 'timeline',
      inverted: vertical ? true : false,
      height: vertical ? '90%' : '30%',
      zoomType: 'x',
      backgroundColor: darkMode ? '#303030' : '#FAFAFA',
    },
    title: {
      text: '',
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        events: {
          click: (e: any) =>
            handleClick(e.point.options.queryKey, e.point.options.queryValue),
        },
      },
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    },
    tooltip: {
      style: {
        width: 300,
      },
    },
    series: [
      {
        dataLabels: {
          allowOverlap: false,
          format:
            '<span style="color:{point.color}">● </span><span style="font-weight: bold;" > ' +
            '{point.x:%d %b %Y}</span><br/>{point.label}',
        },
        marker: {
          symbol: 'circle',
        },
        data: [
          {
            x: new Date('2000-09-19').getTime(),
            label: 'Chewco',
            description: 'Chewco partnership discussions',
            queryKey: 'allText',
            queryValue: 'chewco',
            color: 'brown',
          },
          {
            x: new Date('2001-04-01').getTime(),
            label: 'Raptor',
            description: 'Raptor swaps discussions',
            queryKey: 'allText',
            queryValue: 'raptor',
            color: 'brown',
          },
          {
            x: new Date('2001-08-22').getTime(),
            label: 'Watkins meeting',
            description: 'Watkins meets with Lay',
            queryKey: 'from',
            queryValue: '(Watkins, Sherron)',
            color: getContactColor('Watkins, Sherron'),
          },
          {
            x: new Date('2001-10-12').getTime(),
            label: 'Anderson shreds documents',
            description: 'Andersen destroys 1 ton of Enron documents',
            queryKey: 'allText',
            queryValue: 'anderson',
            color: 'black',
          },
          {
            x: new Date('2001-12-02').getTime(),
            label: 'Enron bankruptcy',
            description:
              'Enron files for bankruptcy, thousands of workers laid off',
            queryKey: 'allText',
            queryValue: 'bankruptcy',
            color: 'black',
          },
          {
            x: new Date('2002-01-09').getTime(),
            label: 'Criminal investigation',
            description:
              'Justice Department launches a criminal investigation.',
            queryKey: 'allText',
            queryValue: 'investigation',
            color: 'black',
          },
          {
            x: new Date('2002-01-25').getTime(),
            label: 'Baxter suicide',
            description: 'Baxter found dead of self-inflicted gunshot wound',
            queryKey: 'to',
            queryValue: 'baxter',
            color: 'black',
          },
          {
            x: new Date('2002-03-14').getTime(),
            label: 'Anderson indicted',
            description: 'Andersen indicted on charges of destroying documents',
            queryKey: 'allText',
            queryValue: 'anderson',
            color: 'black',
          },
          {
            x: new Date('2002-06-15').getTime(),
            label: 'Anderson convicted',
            description:
              'Andersen convicted on charges of destroying documents',
            queryKey: 'allText',
            queryValue: 'anderson',
            color: 'black',
          },
          {
            x: new Date('2002-08-31').getTime(),
            label: 'Anderson defunct',
            description: 'Andersen ceases auditing practice',
            queryKey: 'allText',
            queryValue: 'anderson',
            color: 'black',
          },
          {
            x: new Date('2002-10-31').getTime(),
            label: 'Fastow indicted',
            description:
              'Fastow indicted on charges of conspiracy, fraud, money laundering and other counts.',
            queryKey: 'from',
            queryValue: '(Fastow, Andrew)',
            color: getContactColor('Fastow, Andrew'),
          },
          {
            x: new Date('2004-01-14').getTime(),
            label: 'Fastow pleads guilty',
            description:
              'Fastow pleads guilty to two counts of conspiracy and agrees to serve 10 years in prison.',
            queryKey: 'from',
            queryValue: '(Fastow, Andrew)',
            color: getContactColor('Fastow, Andrew'),
          },
          {
            x: new Date('2004-01-22').getTime(),
            label: 'Causey indicted',
            description: 'Causey indicted for wire fraud and conspiracy',
            queryKey: 'from',
            queryValue: '(Causey, Richard)',
            color: getContactColor('Causey, Richard'),
          },
          {
            x: new Date('2004-02-19').getTime(),
            label: 'Skilling indicted',
            description:
              'Skilling added to Causey indictment, pleads innocent to more than 30 counts.',
            queryKey: 'from',
            queryValue: '(Skilling, Jeff)',
            color: getContactColor('Skilling, Jeff'),
          },
          {
            x: new Date('2004-07-08').getTime(),
            label: 'Lay indicted',
            description:
              'Lay surrenders after being indicted. He pleads innocent.',
            queryKey: 'from',
            queryValue: '(Lay, Kenneth)',
            color: getContactColor('Lay, Kenneth'),
          },
          {
            x: new Date('2005-12-28').getTime(),
            label: 'Causey pleads guilty',
            description:
              'Causey pleads guilty, agrees to testify against Lay and Skilling',
            queryKey: 'from',
            queryValue: '(Causey, Richard)',
            color: getContactColor('Causey, Richard'),
          },
          {
            x: new Date('2006-07-05').getTime(),
            label: 'Lay dies',
            description: 'Lay dies of heart attack while vacationing in Aspen',
            queryKey: 'from',
            queryValue: '(Lay, Kenneth)',
            color: getContactColor('Lay, Kenneth'),
          },
          {
            x: new Date('2006-10-23').getTime(),
            label: 'Skilling sentenced',
            description: 'Skilling sentenced to 24 years in prison',
            queryKey: 'from',
            queryValue: '(Skilling, Jeff)',
            color: getContactColor('Skilling, Jeff'),
          },
        ],
      },
    ],
  }

  return (
    <div>
      {contactsLoading && <LinearProgress />}
      <Tooltip
        title="Toggle Horitonal / Vertical"
        aria-label="Toggle Horitonal / Vertical"
      >
        <IconButton
          data-testid="toggle-vertical"
          onClick={() => toggleVertical()}
        >
          {vertical ? <SwapVerticalCircleIcon /> : <SwapHorizontalCircleIcon />}
        </IconButton>
      </Tooltip>
      {config && <HighchartsReact highcharts={Highcharts} options={config} />}
      <button hidden onClick={() => handleClick('foo', 'to')}>
        handleClick
      </button>
    </div>
  )
}
