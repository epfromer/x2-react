import * as am4core from '@amcharts/amcharts4/core'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import MomentUtils from '@date-io/moment'
import { store } from '@klonzo/common'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'

am4core.useTheme(am4themes_animated)

const AppWithPickers = () => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiPickersUtilsProvider>
)

ReactDOM.render(<AppWithPickers />, document.getElementById('root'))
