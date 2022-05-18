import React, { useEffect } from 'react'
import { NavLink, Routes, Route, useLocation } from 'react-router-dom'
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
  useEffect(() => {
    console.log('routing changed, re-checked auth status...')
    props.getAuthStatus()
  }, [location])
  return (
    <>
      <Spinner />
      <Message />
      <Opacity>
        <button id="logout">Logout from app</button>
        <button id="logout">Logout from app</button>
        <h1>Welcome</h1>
        <nav>
          <NavLink to="/">Test your knowledge</NavLink>
          <NavLink to="/auth">Login into account</NavLink>
          <NavLink to="/stats">Stats</NavLink>
          {props.auth.admin && <NavLink to="/admin">Admin</NavLink>}
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
