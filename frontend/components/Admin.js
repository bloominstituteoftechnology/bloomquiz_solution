import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import QuizForm from './QuizForm'
import QuizList from './QuizList'

export function Admin(props) {
  const { auth, navigate } = props

  useEffect(() => {
    if (auth.admin === false) {
      navigate('/auth')
    }
  }, [auth])

  return (
    <Routes>
      <Route path="edit/:id" element={<QuizForm navigate={navigate} />} />
      <Route path="/" element={<QuizList navigate={navigate} />} />
    </Routes>
  )
}

export default connect(st => ({ auth: st.auth }))(Admin)
