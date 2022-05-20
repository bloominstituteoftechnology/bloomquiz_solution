import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as actions from '../state/action-creators'

export function Stats(props) {
  const { stats, getGeneralStats, auth } = props
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.user) navigate('/auth')
  }, [auth])

  useEffect(() => {
    getGeneralStats()
  }, [])

  if (!stats.general) return null

  return (
    <>
      <h1>{stats.general.corrects}</h1>correct answers
      <h1>{stats.general.incorrects}</h1>incorrect answers
    </>
  )
}

export default connect(st => st, actions)(Stats)
