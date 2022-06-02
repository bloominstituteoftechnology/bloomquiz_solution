import React from 'react'
import { render, screen } from '@testing-library/react'
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
  screen.getByText('Loading next quiz', queryOptions)
})
it('loads the first quiz with submit button disabled', async () => {
  expect(await screen.findByText('Submit answer', queryOptions, waitForOptions))
    .toBeDisabled()
})
