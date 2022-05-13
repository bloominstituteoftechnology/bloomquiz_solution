import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function QuizForm(props) {
  return (
    <form id="loginForm">
      <h2>New Quiz</h2>
      <input
        maxLength={50}
        placeholder="Enter question title"
        id="question_title"
      />
      <input
        maxLength={50}
        placeholder="Enter question hint"
        id="question_hint"
      />
      <textarea
        placeholder="Enter question text"
        id="question_text"
      />
      ENTER THE CORRECT OPTION
      <textarea
        maxLength={50}
        placeholder="Enter option text"
        id="option_text_1"
      />
      <input
        maxLength={50}
        placeholder="Enter option remark"
        id="remark_1"
      />
      ENTER THE DISTRACTOR OPTIONS
      <textarea
        maxLength={50}
        placeholder="Enter option text"
        id="option_text_2"
      />
      <input
        maxLength={50}
        placeholder="Enter option remark"
        id="remark_2"
      />
      <button>
        Submit Quiz
      </button>
    </form>
  )
}

export default connect(st => st, actions)(QuizForm)
