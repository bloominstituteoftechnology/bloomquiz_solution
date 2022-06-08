import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function Stats(props) {
  const {
    stats,
    getGeneralStats,
  } = props

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
}), {
  // action creators
  getGeneralStats: actions.getGeneralStats,
})(Stats)
