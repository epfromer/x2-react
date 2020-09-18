import { store } from '@klonzo/common'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'

const AppWithPickers = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(<AppWithPickers />, document.getElementById('root'))
