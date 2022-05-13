import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import AuthForm from './AuthForm'
import Message from './Message'
import Spinner from './Spinner'
import Opacity from './Opacity'
import Quiz from './Quiz'

export default function App(props) {
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
        </nav>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="auth" element={<AuthForm />} />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </Opacity>
    </>
  )
}
