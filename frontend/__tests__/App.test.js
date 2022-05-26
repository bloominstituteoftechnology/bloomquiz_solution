import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import App from '../components/App'
import { resetStore } from '../components/App'

const waitForOptions = { timeout: 100 }
const queryOptions = { exact: false }

const renderApp = ui => {
  resetStore()
  window.localStorage.clear()
  window.history.pushState({}, 'Test page', '/')
  return render(ui)
}

beforeEach(() => {
  renderApp(<App />)
})

it('renders without errors', () => {
  screen.debug()
})
