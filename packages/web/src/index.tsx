import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { store } from '@klonzo/shared'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'

const AppWithPickers = () => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiPickersUtilsProvider>
)

ReactDOM.render(<AppWithPickers />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
