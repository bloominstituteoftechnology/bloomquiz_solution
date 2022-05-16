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
  const remOpt = option => evt => {
    evt.preventDefault()
    removeOption(option)
  }
  const onChange = ({ target: { id, value } }) => {
    questionInputChange({ id, value })
  }
  return (
    <form id="loginForm">
      <h2>New Quiz</h2>
      <input
        maxLength={50}
        placeholder="Enter question title"
        id="question_title"
        value={questionForm.question_title}
        onChange={onChange}
      />
      <input
        maxLength={50}
        placeholder="Enter question hint"
        id="question_hint"
        value={questionForm.question_hint}
        onChange={onChange}
      />
      <textarea
        placeholder="Enter question text"
        id="question_text"
        value={questionForm.question_text}
        onChange={onChange}
      />
      ENTER THE CORRECT OPTION
      <textarea
        maxLength={50}
        placeholder="Enter option text"
        id="option_text_1"
        value={questionForm.options[0].option_text_1}
        onChange={onChange}
      />
      <input
        maxLength={50}
        placeholder="Enter option remark"
        id="remark_1"
        value={questionForm.options[0].remark_1}
        onChange={onChange}
      />
      ENTER THE DISTRACTOR OPTIONS
      {
        questionForm.options.slice(1).map(opt => {
          return (
            <div key={opt}>
              <textarea
                maxLength={50}
                placeholder="Enter option text"
                id="option_text_2"
                value={questionForm.option_text_2}
                onChange={onChange}
              />
              <input
                maxLength={50}
                placeholder="Enter option remark"
                id="remark_2"
                value={questionForm.remark_2}
                onChange={onChange}
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
