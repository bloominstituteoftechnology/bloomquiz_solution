import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function QuizList(props) {
  const {
    questionFormReset,
    questionFormSetExisting,
    getQuizzes,
    quizList,
    navigate,
  } = props

  const onNew = () => {
    questionFormReset()
    navigate('/admin/edit/new')
  }

  const onEdit = question_id => () => {
    questionFormSetExisting(quizList.find(q => q.question_id === question_id))
    navigate('/admin/edit/' + question_id)
  }

  useEffect(() => {
    getQuizzes()
  }, [])

  return (
    <div>
      <button className="jumbo-button" onClick={onNew}>New Quiz</button>
      {
        quizList.map(q => {
          return <div className="question answer" key={q.question_id}>
            {q.question_title}
            <button onClick={onEdit(q.question_id)}>Edit</button>
          </div>
        })
      }
    </div>
  )
}

export default connect(st => st, actions)(QuizList)
