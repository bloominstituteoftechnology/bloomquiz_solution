import React, { useEffect } from 'react'
import { NavLink, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'
// components
import AuthForm from './AuthForm'
import Message from './Message'
import Spinner from './Spinner'
import Opacity from './Opacity'
import Quiz from './Quiz'
import Admin from './Admin'
import Stats from './Stats'

export function App(props) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    props.getAuthStatus()
  }, [location])

  const onLogin = () => {
    navigate('/auth')
  }

  const onLogout = () => {
    props.reset()
    props.setMessage('Bye!')
    window.localStorage.removeItem('token')
    navigate('/auth', { replace: true })
  }

  const { user, admin, username } = props.auth

  return (
    <>
      <Spinner />
      <Message />
      <Opacity>
        {user && <button onClick={onLogout} id="logout">Logout {username}</button>}
        {!user && location.pathname !== '/auth' && <button onClick={onLogin} id="logout">Login</button>}
        <h1>QuizMaster</h1>
        <nav>
          <NavLink to="/">Test yourself!</NavLink>
          {user && <NavLink to="/stats">Stats</NavLink>}
          {admin && <NavLink to="/admin">Admin</NavLink>}
        </nav>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="auth" element={<AuthForm />} />
          <Route path="admin" element={<Admin />} />
          <Route path="stats" element={<Stats />} />
        </Routes>
        <footer>Bloom Institute of Technology {new Date().getFullYear()}</footer>
      </Opacity>
    </>
  )
}

export default connect(st => st, actions)(App)
