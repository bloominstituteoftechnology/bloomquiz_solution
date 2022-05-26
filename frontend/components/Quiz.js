import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'
import Md from 'react-markdown'

export function Quiz(props) {
  const {
    quiz: { question, option_id },
    nextQuiz,
    selectOption,
    answerQuiz,
    questionFormSetExisting,
    navigate,
    auth,
  } = props

  useEffect(() => {
    if (!question) nextQuiz()
  }, [])

  const onClick = () => {
    answerQuiz({ question_id: question.question_id, option_id })
  }

  const onEdit = question => () => {
    if (auth.admin) {
      questionFormSetExisting(question)
      navigate('/admin/quiz/edit')
    }
  }

  return (
    <div>
      {
        question ? (
          <>
            <div id="quizAnswers">
              {
                auth.admin &&
                <button className="edit" onClick={onEdit(question)}>🔧</button>
              }
              <Md className="question text md">
                {question.question_text}
              </Md>
              {
                question.options.map(opt => (
                  <div
                    key={opt.option_id}
                    className={`question answer${option_id === opt.option_id ? ' selected' : ''}`}
                    onClick={() => selectOption(opt.option_id)}
                  >
                    <Md className="md">{opt.option_text}</Md>
                    <button className="wide">
                      {option_id === opt.option_id ? 'SELECTED' : 'Select'}
                    </button>
                  </div>
                ))
              }
            </div>
            <div className="button-group">
              <button className="jumbo-button" onClick={onClick} disabled={!option_id}>
                Submit answer
              </button>
            </div>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => ({
  quiz: st.quiz,
  auth: st.auth,
}), {
  nextQuiz: actions.nextQuiz,
  selectOption: actions.selectOption,
  answerQuiz: actions.answerQuiz,
  questionFormSetExisting: actions.questionFormSetExisting,
})(Quiz)
