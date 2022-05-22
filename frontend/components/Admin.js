import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
    <>
      <QuizForm />
      <QuizList />
    </>
  )
}

export default connect(st => st)(Admin)
