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

export function Routing(props) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    props.getAuthStatus()
  }, [location.pathname])

  const onLogout = () => {
    props.reset()
    props.setMessage({ main: 'Bye' })
    window.localStorage.removeItem('token')
    navigate('/auth', { replace: true })
  }

  const { user, admin } = props.auth

  return (
    <>
      <Spinner />
      <Opacity>
        <Message />
        {user && <button onClick={onLogout} id="logout">Logout</button>}
        <nav>
          <NavLink to="/">Test yourself!</NavLink>
          {user && <NavLink to="/stats">Stats</NavLink>}
          {admin && <NavLink to="/admin">Admin</NavLink>}
          {!user && location.pathname !== '/auth' && <NavLink to="/auth">Sign in to see your stats</NavLink>}
        </nav>
        <Routes>
          <Route path="/" element={<Quiz navigate={navigate} />} />
          <Route path="auth" element={<AuthForm navigate={navigate} />} />
          <Route path="admin/*" element={<Admin navigate={navigate} />} />
          <Route path="stats" element={<Stats navigate={navigate} />} />
        </Routes>
        <footer>Bloom Institute of Technology {new Date().getFullYear()}</footer>
      </Opacity>
    </>
  )
}

export default connect(st => st, actions)(Routing)
