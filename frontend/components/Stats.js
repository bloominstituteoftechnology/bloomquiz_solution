import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getGeneralStats, setMessage } from '../state/action-creators'

export function Stats(props) {
  const {
    auth,
    stats,
    getGeneralStats,
    setMessage,
    navigate,
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

  if (!stats.general) return null

  return (
    <>
      <h1>{stats.general.corrects}</h1>correct answers
      <h1>{stats.general.incorrects}</h1>incorrect answers
    </>
  )
}

export default connect(st => ({
  stats: st.stats, auth: st.auth
}), { getGeneralStats, setMessage })(Stats)
