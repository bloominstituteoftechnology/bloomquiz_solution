import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import QuizForm from './QuizForm'
import QuizList from './QuizList'
import { setMessage } from '../state/action-creators'

export function Admin(props) {
  const { auth, navigate, setMessage } = props

  useEffect(() => {
    if (auth.admin === false) {
      navigate('/auth')
      setMessage({ code: 2, main: 'Not allowed there' })
    }
  }, [auth])

  return (
    <Routes>
      <Route path="quiz/edit" element={<QuizForm navigate={navigate} />} />
      <Route path="/" element={<QuizList navigate={navigate} />} />
    </Routes>
  )
}

export default connect(st => ({ auth: st.auth }), { setMessage })(Admin)
