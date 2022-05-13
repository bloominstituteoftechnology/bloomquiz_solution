import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function Quiz(props) {
  const {
    quiz: { question, option_id },
    nextQuiz,
    selectOption,
    answerQuiz,
  } = props

  useEffect(() => {
    if (!question) nextQuiz()
  }, [])

  const onClick = evt => {
    answerQuiz({ question_id: question.question_id, option_id })
  }

  return (
    <div id="wrapper">
      {
        question ? (
          <>
            <h2>{question.question_text}</h2>
            <div id="quizAnswers">
              {
                question.options.map(opt => (
                  <div
                    key={opt.option_id}
                    className={`answer${option_id === opt.option_id ? ' selected' : ''}`}
                  >
                    {opt.option_text}
                    <button onClick={() => selectOption(opt.option_id)}>
                      {option_id === opt.option_id ? 'SELECTED' : 'Select'}
                    </button>
                  </div>
                ))
              }
            </div>
            <button onClick={onClick} disabled={!option_id}>
              Submit answer
            </button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => st, actions)(Quiz)
