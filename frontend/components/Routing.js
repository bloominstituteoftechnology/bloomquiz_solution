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

  const onLogout = () => { }

  const { is_user, is_admin } = props.auth
  const renderNav = !is_admin || location.pathname !== '/admin/quiz/edit'
  return (
    <>
      <Spinner />
      <Opacity>
        <Message />
        {is_user && <button onClick={onLogout} id="logout">Logout</button>}
        <nav>
          {
            renderNav &&
            <>
              <NavLink to="/">{is_admin ? "Selected Quiz" : "Test yourself!"}</NavLink>
              {is_admin && <NavLink to="/admin">Quizzes</NavLink>}
              <NavLink to="/stats">Stats</NavLink>
              {!is_user && location.pathname !== '/auth' && <NavLink to="/auth">Sign in to save your progress</NavLink>}
            </>
          }
        </nav>
        <Routes>
          <Route path="/" element={<Quiz navigate={navigate} />} />
          <Route path="auth" element={<AuthForm navigate={navigate} />} />
          <Route path="admin/*" element={<Admin navigate={navigate} />} />
          <Route path="stats" element={<Stats />} />
        </Routes>
        <footer>Bloom Institute of Technology {new Date().getFullYear()}</footer>
      </Opacity>
    </>
  )
}

export default connect(st => st, actions)(Routing)
