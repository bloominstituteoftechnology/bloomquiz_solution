import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function Quiz(props) {
  const { quiz } = props
  return (
    <div>
      Here is your quiz... {JSON.stringify(quiz)}
    </div>
  )
}

export default connect(st => st, actions)(Quiz)
