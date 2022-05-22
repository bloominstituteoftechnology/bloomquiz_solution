import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import * as actions from '../state/action-creators'

const scale = keyframes`
  0% { transform: scaleY(0); }
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
    questionForm,
  } = props

  const [optionBars, setOptionBars] = useState(() => {
    let state = {}
    Object.keys(questionForm.options).forEach(key => {
      state[key] = false
    })
    return state
  })

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
  const toggleBar = optionId => {
    setOptionBars({ ...optionBars, [optionId]: !optionBars[optionId] })
  }
  return (
    <form onSubmit={onSubmit}>
      <h2>Create New Question</h2>
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
          const optionIsCollapsed = !optionBars[optionKey]
          const optionIsExpanded = optionBars[optionKey]
          const removeBtnDisabled = Object.keys(questionForm.options).length < 3
          const optionSlice = option.option_text.slice(0, 30)

          const rightArrow = <>&#9658;</>
          const downArrow = <>&#9660;</>
          const whitespace = <>&nbsp;</>

          return (
            <div className={`option${option.is_correct ? " truthy" : ""}`} key={optionKey}>
              <div className="option-bar" onClick={() => toggleBar(optionKey)}>
                <span>
                  {optionIsCollapsed ? rightArrow : downArrow}
                  {whitespace} Option {idx + 1} {whitespace}
                  {optionIsCollapsed && optionSlice}
                </span>
                <button
                  className="option-operation"
                  disabled={removeBtnDisabled}
                  onClick={onRemoveOption(optionKey)}>&#10060;</button>
              </div>
              {
                optionIsExpanded &&
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
      <button className="jumbo-button">Submit Quiz</button>
    </form >
  )
}

export default connect(st => st, actions)(QuizForm)
