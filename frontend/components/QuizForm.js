import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function QuizForm(props) {
  const {
    addOption,
    removeOption,
    questionInputChange,
    questionOptionInputChange,
    questionOptionSetCorrect,
    createQuestion,
    questionForm,
  } = props
  const onAddOption = evt => {
    evt.preventDefault()
    addOption()
  }
  const onRemoveOption = optionKey => evt => {
    evt.preventDefault()
    removeOption(optionKey)
  }
  const onQuestionChange = ({ target: { name, value } }) => {
    questionInputChange({ name, value })
  }
  const onQuestionOptionChange = optionKey => ({ target }) => {
    const { name, value } = target
    questionOptionInputChange({ optionKey, name, value })
  }
  const onQuestionSetCorrect = optionKey => () => {
    questionOptionSetCorrect(optionKey)
  }
  const onSubmit = evt => {
    evt.preventDefault()
    const payload = { ...questionForm, options: Object.values(questionForm.options) }
    createQuestion(payload)
  }
  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>New Quiz</h2>
      <input
        maxLength={50}
        placeholder="Enter question title"
        name="question_title"
        value={questionForm.question_title}
        onChange={onQuestionChange}
      />
      <input
        maxLength={50}
        placeholder="Enter question hint"
        name="question_hint"
        value={questionForm.question_hint}
        onChange={onQuestionChange}
      />
      <textarea
        placeholder="Enter question text"
        name="question_text"
        value={questionForm.question_text}
        onChange={onQuestionChange}
      />
      Options
      {
        Object.keys(questionForm.options).map(optionKey => {
          const option = questionForm.options[optionKey]
          return (
            <div key={optionKey} style={{
              border: option.is_correct ? '10px solid green' : '10px solid red'
            }}>
              <textarea
                maxLength={50}
                placeholder="Enter option text"
                name="option_text"
                value={option.option_text}
                onChange={onQuestionOptionChange(optionKey)}
              />
              <input
                maxLength={50}
                placeholder="Enter option remark"
                name="remark"
                value={option.remark}
                onChange={onQuestionOptionChange(optionKey)}
              />
              <input
                type="checkbox"
                name="is_correct"
                checked={option.is_correct}
                onChange={onQuestionSetCorrect(optionKey)}
              />
              <button
                disabled={questionForm.options.length < 3}
                onClick={onRemoveOption(optionKey)}>remove</button>
            </div>
          )
        })
      }
      <button onClick={onAddOption}>add option</button>
      <button>Submit Quiz</button>
    </form>
  )
}

export default connect(st => st, actions)(QuizForm)
