import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function QuizForm(props) {
  const {
    addOption,
    removeOption,
    questionInputChange,
    questionForm,
  } = props
  const addOpt = evt => {
    evt.preventDefault()
    addOption()
  }
  const remOpt = option_id => evt => {
    evt.preventDefault()
    removeOption(option_id)
  }
  const submit = evt => {
    evt.preventDefault()
  }
  return (
    <form id="loginForm">
      <h2>New Quiz</h2>
      <input
        maxLength={50}
        placeholder="Enter question title"
        id="question_title"
        value={questionForm.question_title}
        onChange={questionInputChange}
      />
      <input
        maxLength={50}
        placeholder="Enter question hint"
        id="question_hint"
        value={questionForm.question_hint}
        onChange={questionInputChange}
      />
      <textarea
        placeholder="Enter question text"
        id="question_text"
        value={questionForm.question_text}
        onChange={questionInputChange}
      />
      ENTER THE CORRECT OPTION
      <textarea
        maxLength={50}
        placeholder="Enter option text"
        id="option_text_1"
        value={questionForm.option_text_1}
        onChange={questionInputChange}
      />
      <input
        maxLength={50}
        placeholder="Enter option remark"
        id="remark_1"
        value={questionForm.remark_1}
        onChange={questionInputChange}
      />
      ENTER THE DISTRACTOR OPTIONS
      {
        questionForm.options.map(opt => {
          return (
            <div key={opt.option_id}>
              <textarea
                maxLength={50}
                placeholder="Enter option text"
                id="option_text_2"
                value={questionForm.option_text_2}
                onChange={questionInputChange}
              />
              <input
                maxLength={50}
                placeholder="Enter option remark"
                id="remark_2"
                value={questionForm.remark_2}
                onChange={questionInputChange}
              />
              <button
                disabled={questionForm.options.length < 3}
                onClick={remOpt(opt.option_id)}>remove</button>
            </div>
          )
        })
      }
      <button
        disabled={questionForm.options.length > 9}
        onClick={addOpt}>add distractor</button>
      <button>
        Submit Quiz
      </button>
    </form>
  )
}

export default connect(st => st, actions)(QuizForm)
