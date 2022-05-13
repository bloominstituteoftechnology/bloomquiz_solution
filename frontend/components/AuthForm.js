import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function AuthForm(props) {
  const { inputChange, register, authForm: { username, password } } = props

  const onChange = evt => {
    const { id, value } = evt.target
    inputChange({ id, value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    register({ username, password })
  }

  const isDisabled = () => {
    return (
      username.trim().length < 3 ||
      password.trim().length < 8
    )
  }

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

export default connect(st => st, actions)(AuthForm)
