import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function AuthForm(props) {
  const [isNewUser, setIsNewUser] = useState(false)
  const {
    login,
    register,
    authInputChange,
    authForm: { username, password }
  } = props

  const onChange = evt => {
    const { id, value } = evt.target
    authInputChange({ id, value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    const callback = isNewUser ? register : login
    callback({ username, password })
  }

  const isDisabled = () => {
    return (
      username.trim().length < 3 ||
      password.trim().length < 4
    )
  }

  const toggleMode = evt => {
    evt.preventDefault()
    setIsNewUser(!isNewUser)
  }

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>{isNewUser ? "Register" : "Login"}</h2>
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
      <button disabled={isDisabled()} id="submitCredentials">
        Submit credentials
      </button>
      <a onClick={toggleMode}>
        {isNewUser ? "Already have an account? Login instead" : "New to the site? Register instead"}
      </a>
    </form>
  )
}

export default connect(st => st, actions)(AuthForm)
