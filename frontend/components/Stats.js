import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getGeneralStats, setMessage } from '../state/action-creators'

export function Stats(props) {
  const {
    auth,
    setMessage,
    navigate,
    stats,
    getGeneralStats,
  } = props

  useEffect(() => {
    if (auth.user === false) {
      navigate('/auth')
      setMessage({ main: 'Not allowed there', code: 'red' })
    }
  }, [auth])

  useEffect(() => {
    getGeneralStats()
  }, [])

  if (!stats) return null

  return (
    <>
      <h1>{stats.corrects}</h1>correct answers
      <h1>{stats.incorrects}</h1>incorrect answers
    </>
  )
}

export default connect(st => ({
  // mapping state to props
  stats: st.stats,
  auth: st.auth
}), {
  // action creators
  getGeneralStats,
  setMessage,
})(Stats)
