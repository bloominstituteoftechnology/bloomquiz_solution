import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function QuizList(props) {
  const {
    addOption,

  } = props

  return (
'quizlist'
  )
}

export default connect(st => st, actions)(QuizList)
