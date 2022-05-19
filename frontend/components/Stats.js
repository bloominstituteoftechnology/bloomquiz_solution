import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function Stats(props) {
  const { stats, getGeneralStats } = props

  useEffect(() => {
    getGeneralStats()
  }, [])

  if (!stats.general) return null

  return (
    <>
      <h3>
        You answered correctly {stats.general.corrects} times
      </h3>
      <h3>
        You answered incorrectly {stats.general.incorrects} times
      </h3>
    </>
  )
}

export default connect(st => st, actions)(Stats)
