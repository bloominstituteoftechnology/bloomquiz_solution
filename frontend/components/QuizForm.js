/* =============== 👉 9.1 STEP 1 =============== */
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { connect } from 'react-redux'
import {
  addOption,
  removeOption,
  questionInputChange,
  questionOptionInputChange,
  questionOptionSetCorrect,
  createQuestion,
  editQuestion,
} from '../state/action-creators'

/* =============== 👉 9.1 STEP 6 =============== */
const scale = keyframes`
  100% { transform: scaleY(1); }
`

const StyledInputGroup = styled.div`
  transform: scaleY(0);
  transform-origin: top center;
  animation: ${scale} 0.25s forwards;
`

export function QuizForm(props) {
  const {
    addOption,
    removeOption,
    questionInputChange,
    questionOptionInputChange,
    questionOptionSetCorrect,
    createQuestion,
    editQuestion,
    questionForm,
    navigate,
  } = props

  /* =============== 👉 9.1 STEP 2 =============== */
  const [optionBars, setOptionBars] = useState(() => {
    let state = {}
    Object.keys(questionForm.options).forEach(key => {
      state[key] = false
    })
    return state
  })
  /* =============== 👉 9.1 STEP 3 =============== */
  const toggleBar = optionKey => {
    setOptionBars({ ...optionBars, [optionKey]: !optionBars[optionKey] })
  }
  const onRedirect = evt => {
    if (evt) evt.preventDefault()
    navigate('/admin')
  }
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
    const callback = questionForm.question_id ? editQuestion : createQuestion
    callback(payload, onRedirect)
  }
  return (
    <form onSubmit={onSubmit}>
      <h2>{questionForm.question_id ? "Edit" : "Create New"} Question</h2>
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
      <div className="options-heading">
        <h2>Options</h2><button className="option-operation" onClick={onAddOption}>➕</button>
      </div>
      {
        Object.keys(questionForm.options).map((optionKey, idx) => {
          const option = questionForm.options[optionKey]
          const removeBtnDisabled = Object.keys(questionForm.options).length < 3
          /* =============== 👉 9.1 STEP 4 =============== */
          const optionIsExpanded = optionBars[optionKey]
          const optionSlice = option.option_text.slice(0, 40)

          const rightArrow = <>&#9658;</>
          const downArrow = <>&#9660;</>
          const whitespace = <>&nbsp;</>

          return (
            <div className={`option${option.is_correct ? " truthy" : ""}`} key={optionKey}>
              {/* =============== 👉 9.1 STEP 3 (continued) =============== */}
              <div className="option-bar" onClick={() => toggleBar(optionKey)}>
                {/* =============== 👉 9.1 STEP 4 (continued) =============== */}
                <span>
                  {!optionIsExpanded ? rightArrow : downArrow}
                  {whitespace} Option {idx + 1} {whitespace}
                  {!optionIsExpanded && optionSlice}
                </span>
                <button
                  className="option-operation"
                  disabled={removeBtnDisabled}
                  onClick={onRemoveOption(optionKey)}>&#10060;</button>
              </div>
              {
                /* =============== 👉 9.1 STEP 5 =============== */
                optionIsExpanded &&
                /* =============== 👉 9.1 STEP 6 (continued) =============== */
                <StyledInputGroup className="option-inputs">
                  <textarea
                    maxLength={400}
                    placeholder="Option text"
                    name="option_text"
                    value={option.option_text}
                    onChange={onQuestionOptionChange(optionKey)}
                  />
                  <textarea
                    type="text"
                    maxLength={400}
                    placeholder="Option remark"
                    name="remark"
                    value={option.remark ?? ''}
                    onChange={onQuestionOptionChange(optionKey)}
                  />
                  <label>
                    <input
                      type="radio"
                      name="is_correct"
                      checked={option.is_correct}
                      onChange={onQuestionSetCorrect(optionKey)}
                    />&nbsp;&nbsp;correct option
                  </label>
                </StyledInputGroup>
              }
            </div>
          )
        })
      }
      <div className="button-group">
        <button className="jumbo-button">Submit</button>
        <button onClick={onRedirect}>Cancel</button>
      </div>
    </form >
  )
}

export default connect(st => ({
  questionForm: st.questionForm,
}), {
  addOption,
  removeOption,
  questionInputChange,
  questionOptionInputChange,
  questionOptionSetCorrect,
  createQuestion,
  editQuestion,
})(QuizForm)
