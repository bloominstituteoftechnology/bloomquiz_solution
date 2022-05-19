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
        type="text"
        maxLength={50}
        placeholder="Question title"
        name="question_title"
        value={questionForm.question_title}
        onChange={onQuestionChange}
      />
      <textarea
        placeholder="Question text"
        name="question_text"
        value={questionForm.question_text}
        onChange={onQuestionChange}
      />
      <h2>Options</h2>
      {
        Object.keys(questionForm.options).map(optionKey => {
          const option = questionForm.options[optionKey]
          return (
            <div className={`option${option.is_correct ? " truthy" : ""}`} key={optionKey}>
              <textarea
                maxLength={400}
                placeholder="Option text"
                name="option_text"
                value={option.option_text}
                onChange={onQuestionOptionChange(optionKey)}
              />
              <input
                type="text"
                maxLength={400}
                placeholder="Option remark"
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
                disabled={Object.keys(questionForm.options).length < 3}
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
