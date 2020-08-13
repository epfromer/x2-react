import { mockStore } from '@klonzo/common'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import 'jest-canvas-mock'
import _ from 'lodash'
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import configureStore from 'redux-mock-store'

// https://testing-library.com/docs/vue-testing-library/intro

export function renderComp(
  comp,
  customStore = {},
  history = createMemoryHistory()
) {
  const newStore = _.cloneDeep(mockStore)
  _.merge(newStore, customStore)

  const mock = configureStore([])(newStore)
  return render(
    <Router history={history}>
      <Provider store={mock}>{comp}</Provider>
    </Router>
  )
}

// mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  observe() {
    return null
  }
  disconnect() {
    return null
  }
  unobserve() {
    return null
  }
}
