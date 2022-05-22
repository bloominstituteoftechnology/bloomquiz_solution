import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function QuizList(props) {
  const navigate = useNavigate()

  const onNew = () => {
    props.questionFormReset()
    navigate('/admin/edit/new')
  }

  const onEdit = question_id => () => {
    props.questionFormSetExisting(props.quizList.find(q => q.question_id === question_id))
    navigate('/admin/edit/' + question_id)
  }

  useEffect(() => {
    props.getQuizzes()
  }, [])

  return (
    <>
      <button className="jumbo-button" onClick={onNew}>New Quiz</button>
      {
        props.quizList.map(q => {
          return <div className="question answer" key={q.question_id}>
            {q.question_title}
            <button onClick={onEdit(q.question_id)}>Edit</button>
          </div>
        })
      }
    </>
  )
}

export default connect(st => st, actions)(QuizList)
