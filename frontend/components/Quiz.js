import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function Quiz(props) {
  const { quiz, nextQuiz } = props

  useEffect(() => {
    if (!quiz.question) nextQuiz()
  }, [])

  return (
    <div id="wrapper">
      {
        quiz.question ? (
          <>
            <h2>{quiz.question.question_text}</h2>
            <div id="quizAnswers">
              {
                quiz.question.options.map(opt => (
                  <div
                    key={opt.option_id}
                    className={`answer${quiz.option_id === opt.option_id ? ' selected' : ''}`}
                  >
                    {opt.option_text}
                    <button>
                      {quiz.option_id === opt.answer_id ? 'SELECTED' : 'Select'}
                    </button>
                  </div>
                ))
              }
            </div>
            <button id="submitAnswerBtn" disabled={!quiz.option_id}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => st, actions)(Quiz)
