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
              <div className={`answer${quiz.option_id === quiz.question.options[0].answer_id ? ' selected' : ''}`}>
                {quiz.question.options[0].option_text}
                <button>
                  {quiz.option_id === quiz.question.options[0].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className={`answer${quiz.option_id === quiz.question.options[1].answer_id ? ' selected' : ''}`}>
                {quiz.question.options[1].option_text}
                <button>
                  {quiz.option_id === quiz.question.options[1].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" disabled={!quiz.option_id}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => st, actions)(Quiz)
