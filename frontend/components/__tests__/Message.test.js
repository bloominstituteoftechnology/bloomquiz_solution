import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// see how we are importing the non-connected (to Redux) version of the component
import { Message } from '../Message'

// to test this component in isolation, without an API, run
// `npm run jest:test -- Message.test.js`

const renderApp = ui => {
  window.localStorage.clear()
  window.history.pushState({}, 'Test page', '/')
  return render(ui)
}
beforeEach(() => { // =============== 👉 [Code-Along 9.2] - step 5
  const infoMessage = { main: 'Welcome', time: new Date().valueOf() }
  renderApp(<Message infoMessage={infoMessage} />)
})
