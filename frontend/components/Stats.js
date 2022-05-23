import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function Stats(props) {
  const { stats, getGeneralStats, navigate, auth } = props

  useEffect(() => {
    if (auth.user === false) navigate('/auth')
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
