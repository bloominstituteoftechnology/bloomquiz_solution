import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function AuthForm(props) {
  const navigate = useNavigate()
  const [isNewUser, setIsNewUser] = useState(false)
  const {
    login,
    register,
    authInputChange,
    authForm: { username, password },
    auth,
  } = props

  useEffect(() => {
    if (auth.user) navigate('/')
  }, [auth.user])

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
      <h2>{isNewUser ? "Register New User" : "Login"}</h2>
      <input
        type="text"
        maxLength={20}
        value={username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        type="password"
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
