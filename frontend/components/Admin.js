import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import QuizForm from './QuizForm'
import QuizList from './QuizList'

export function Admin(props) {
  const navigate = useNavigate()

  const { auth } = props

  useEffect(() => {
    if (!auth.admin) navigate('/auth')
  }, [auth])

  return (
    <Routes>
      <Route path="edit/:id" element={<QuizForm />} />
      <Route path="/" element={<QuizList />} />
    </Routes>
  )
}

export default connect(st => st)(Admin)
