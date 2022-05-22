import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function QuizList(props) {
  useEffect(() => {
    props.getQuizzes()
  }, [])

  return (
    <>
      {
        props.quizList.map(q => {
          return <div className="question answser" key={q.question_id}>{q.question_title}</div>
        })
      }
    </>
  )
}

export default connect(st => st, actions)(QuizList)
