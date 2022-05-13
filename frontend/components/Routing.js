import { NavLink, Routes, Route } from 'react-router-dom'
import React from 'react'
import AuthForm from './AuthForm'
import Message from './Message'
import Spinner from './Spinner'
import Opacity from './Opacity'
import Quiz from './Quiz'
import Admin from './Admin'
import Stats from './Stats'

export default function App() {
  return (
    <>
      <Spinner />
      <Message />
      <Opacity>
        <button id="logout">Logout from app</button>
        <h1>Welcome</h1>
        <nav>
          <NavLink to="/">Test your knowledge</NavLink>
          <NavLink to="/auth">Login into account</NavLink>
          <NavLink to="/stats">Stats</NavLink>
          <NavLink to="/admin">Admin</NavLink>
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
