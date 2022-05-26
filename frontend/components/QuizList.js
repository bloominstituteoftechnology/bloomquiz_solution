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
    setQuiz
  } = props

  const onNew = () => {
    questionFormReset()
    navigate('/admin/quiz/edit')
  }

  const onEdit = question_id => () => {
    questionFormSetExisting(quizList.find(q => q.question_id === question_id))
    navigate('/admin/quiz/edit')
  }

  const onView = question_id => () => {
    setQuiz(quizList.find(q => q.question_id === question_id))
    navigate('/')
  }

  useEffect(() => {
    getQuizzes()
  }, [])

  return (
    <div>
      <div className="button-group">
        <button className="jumbo-button" onClick={onNew}>New Quiz</button>
      </div><br />
      {
        quizList.map(q => {
          return (
            <div className="question answer" key={q.question_id}>
              {q.question_title}
              <div className="mini-group">
                <button onClick={onEdit(q.question_id)}>🔧</button>
                <button onClick={onView(q.question_id)}>👁️</button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default connect(st => st, actions)(QuizList)
