import React from 'react'
import { render, fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { setupServer, getHandlers } from './backend/mock-server'
import { st } from './backend/helpers'
import App from './frontend/components/App'

jest.setTimeout(750) // default 5000 too long for Codegrade
const waitForOptions = { timeout: 150 }
const queryOptions = { exact: false }

const renderApp = ui => {
  window.localStorage.clear()
  window.history.pushState({}, 'Test page', '/')
  return render(ui)
}
let server
beforeAll(() => {
  server = setupServer(...getHandlers())
  server.listen()
})
afterAll(() => {
  server.close()
})
beforeEach(() => {
  renderApp(<BrowserRouter><App /></BrowserRouter>)
})
afterEach(() => {
  server.resetHandlers(...getHandlers())
})

const token = () => window.localStorage.getItem('token')
const logoutBtn = () => screen.queryByText('Logout from app')
// login screen
const usernameInput = () => screen.queryByPlaceholderText('Enter username')
const passwordInput = () => screen.queryByPlaceholderText('Enter password')
const loginBtn = () => screen.queryByText('Submit credentials')
// articles screen
const articlesLink = () => screen.queryByRole('link', { name: 'Articles' })
const titleInput = () => screen.queryByPlaceholderText('Enter title')
const textInput = () => screen.queryByPlaceholderText('Enter text')
const topicSelect = () => screen.queryByRole('combobox')
const submitArticleBtn = () => screen.queryByText('Submit')

const loginFlow = async () => {
  fireEvent.change(usernameInput(), { target: { value: 'Foo' } })
  fireEvent.change(passwordInput(), { target: { value: '12345678' } })
  fireEvent.click(loginBtn())
  await screen.findByText(st.closuresTitle, queryOptions, waitForOptions)
  await screen.findByText('Here are your articles, Foo!', queryOptions, waitForOptions)
}

describe('Advanced Applications', () => {
  describe('Login', () => {
    test(`[1] Submit credentials button is disabled until
        - username (after trimming) is at least 3 chars AND
        - password (after trimming) is at least 8 chars`, () => {
      expect(loginBtn()).toBeDisabled()
      fireEvent.change(usernameInput(), { target: { value: ' 12 ' } })
      fireEvent.change(passwordInput(), { target: { value: ' 1234567 ' } })
      expect(loginBtn()).toBeDisabled()
      fireEvent.change(usernameInput(), { target: { value: ' 123 ' } })
      fireEvent.change(passwordInput(), { target: { value: ' 12345678 ' } })
      expect(loginBtn()).toBeEnabled()
    })
    test(`[2] Attempting to navigate to Articles
        - renders a redirect back to login screen
        - articles form never loads`, () => {
      fireEvent.click(articlesLink())
      expect(titleInput()).not.toBeInTheDocument()
      expect(usernameInput()).toBeInTheDocument()
    })
    test(`[3] Filling out the login form and submitting
        - article titles, texts, topics render on the page
        - success message renders on the page`, async () => {
      // login flow
      fireEvent.change(usernameInput(), { target: { value: 'Foo' } })
      fireEvent.change(passwordInput(), { target: { value: '12345678' } })
      fireEvent.click(loginBtn())
      // titles not there yet
      expect(screen.queryByText(st.closuresTitle, queryOptions)).not.toBeInTheDocument()
      expect(screen.queryByText(st.hooksTitle, queryOptions)).not.toBeInTheDocument()
      expect(screen.queryByText(st.expressTitle, queryOptions)).not.toBeInTheDocument()
      // texts not there yet
      expect(screen.queryByText(st.closuresText, queryOptions)).not.toBeInTheDocument()
      expect(screen.queryByText(st.hooksText, queryOptions)).not.toBeInTheDocument()
      expect(screen.queryByText(st.expressText, queryOptions)).not.toBeInTheDocument()
      // topics not there yet
      expect(screen.queryByText(`Topic: ${st.closuresTopic}`, queryOptions)).not.toBeInTheDocument()
      expect(screen.queryByText(`Topic: ${st.hooksTopic}`, queryOptions)).not.toBeInTheDocument()
      expect(screen.queryByText(`Topic: ${st.expressTopic}`, queryOptions)).not.toBeInTheDocument()
      // success message not there yet
      expect(screen.queryByText('Here are your articles, Foo!', queryOptions)).not.toBeInTheDocument()
      // titles arrive eventually
      await screen.findByText(st.closuresTitle, queryOptions, waitForOptions)
      screen.getByText(st.hooksTitle, queryOptions)
      screen.getByText(st.expressTitle, queryOptions)
      // texts arrive eventually
      screen.getByText(st.closuresText, queryOptions)
      screen.getByText(st.hooksText, queryOptions)
      screen.getByText(st.expressText, queryOptions)
      // topics arrive eventually
      screen.getByText(`Topic: ${st.closuresTopic}`, queryOptions)
      screen.getByText(`Topic: ${st.hooksTopic}`, queryOptions)
      screen.getByText(`Topic: ${st.expressTopic}`, queryOptions)
      // success message arrives eventually
      await screen.findByText('Here are your articles, Foo!', queryOptions, waitForOptions)
    })
  })
  describe('Logout', () => {
    test(`[4] Clicking the logout button
        - redirection to the login screen
        - the "token" key is removed from local storage
        - a success message renders on the page`, async () => {
      await loginFlow()
      // token set sanity check
      expect(token()).toBeTruthy()
      // logout flow
      fireEvent.click(logoutBtn())
      // goodbye message renders
      await screen.findByText('Goodbye!', queryOptions, waitForOptions)
      // login form visible
      await screen.findByPlaceholderText('Enter username', queryOptions, waitForOptions)
      await screen.findByPlaceholderText('Enter password', queryOptions, waitForOptions)
      // token unset
      expect(token()).toBeFalsy()
    })
  })
  describe('Posting a new article', () => {
    test(`[5] Submit button is disabled on page load`, async () => {
      await loginFlow()
      expect(submitArticleBtn()).toBeDisabled()
    })
    test(`[6] Filling out the article form and submitting
        - resets the form
        - adds a new article to the page
        - a success message renders on the page`, async () => {
      await loginFlow()
      // filling out form
      fireEvent.change(titleInput(), { target: { value: 'Fancy Title' } })
      fireEvent.change(textInput(), { target: { value: 'Fancy text' } })
      fireEvent.change(topicSelect(), { target: { value: 'React' } })
      expect(titleInput()).toHaveValue('Fancy Title')
      expect(textInput()).toHaveValue('Fancy text')
      expect(topicSelect()).toHaveValue('React')
      // submission renders new article
      fireEvent.click(submitArticleBtn())
      await screen.findByText('Fancy Title', queryOptions, waitForOptions)
      screen.getByText('Fancy text', queryOptions)
      expect(screen.getAllByText('Topic: React', queryOptions)).toHaveLength(2)
      // inputs are cleared
      expect(titleInput()).toHaveValue('')
      expect(textInput()).toHaveValue('')
      expect(topicSelect()).toHaveValue('')
      // success message from server
      await screen.findByText('Well done, Foo. Great article!', queryOptions, waitForOptions)
    })
  })
  describe('Editing an existing article', () => {
    test('[7] Clicking edit button populates the article information into the form', async () => {
      await loginFlow()
      // entering edit mode
      fireEvent.click(screen.getAllByText('Edit')[0])
      expect(titleInput()).toHaveValue(st.closuresTitle)
      expect(textInput()).toHaveValue(st.closuresText)
      expect(topicSelect()).toHaveValue(st.closuresTopic)
    })
    test(`[8] Editing the form values and submitting
        - updates the edited article on the page
        - resets the form
        - a success message renders on the page`, async () => {
      await loginFlow()
      // entering edit mode
      fireEvent.click(screen.getAllByText('Edit')[0])
      // making edits
      fireEvent.change(titleInput(), { target: { value: 'Fancy Title' } })
      fireEvent.change(textInput(), { target: { value: 'Fancy text' } })
      fireEvent.change(topicSelect(), { target: { value: 'React' } })
      // form filled out
      expect(titleInput()).toHaveValue('Fancy Title')
      expect(textInput()).toHaveValue('Fancy text')
      expect(topicSelect()).toHaveValue('React')
      // submitting updates
      fireEvent.click(submitArticleBtn())
      // edits on the page
      await screen.findByText('Fancy Title', queryOptions, waitForOptions)
      screen.getByText('Fancy text', queryOptions)
      expect(screen.getAllByText('Topic: React', queryOptions)).toHaveLength(2)
      // success message
      await screen.findByText('Nice update, Foo!', queryOptions, waitForOptions)
    })
  })
  describe('Deleting an existing article', () => {
    test(`[9] Clicking delete button on an article
        - removes it from the page
        - a success message renders on the page`, async () => {
      await loginFlow()
      // hitting delete
      fireEvent.click(screen.getAllByText('Delete')[0])
      // article eventually disappears from the page
      await waitForElementToBeRemoved(() => screen.queryByText(st.closuresTitle, queryOptions))
      expect(screen.queryByText(st.closuresText, queryOptions)).not.toBeInTheDocument()
      expect(screen.queryByText(`Topic: ${st.closuresTopic}`, queryOptions)).not.toBeInTheDocument()
      // success message arrives eventually
      await screen.findByText('Article 1 was deleted, Foo!', queryOptions, waitForOptions)
    })
  })
})
