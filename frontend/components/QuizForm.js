import React from 'react'
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

/* =============== 👉 9.1 STEP 5.1 =============== */
import styled, { keyframes } from 'styled-components'

const scale = keyframes`
  100% { transform: scaleY(1); }
  `

const StyledInputGroup = styled.div`
  transform: scaleY(0);
  transform-origin: top center;
  animation: ${scale} 0.25s forwards;
  `

export class QuizForm extends React.Component {
  /* =============== 👉 9.1 STEP 1 =============== */
  constructor(props) {
    super(props)
    const optionBars = {}
    const { options } = props.questionForm
    Object.keys(options).forEach(key => { optionBars[key] = false })
    this.state = { optionBars }
  }
  /* =============== 👉 9.1 STEP 2.1 =============== */
  toggleBar = optionKey => () => {
    const { optionBars } = this.state
    this.setState({
      ...this.state,
      optionBars: {
        ...optionBars,
        [optionKey]: !optionBars[optionKey],
      },
    })
  }
  onRedirect = evt => {
    if (evt) evt.preventDefault()
    this.props.navigate('/admin')
  }
  onAddOption = evt => {
    evt.preventDefault()
    this.props.addOption()
  }
  onRemoveOption = optionKey => evt => {
    evt.preventDefault()
    this.props.removeOption(optionKey)
  }
  onQuestionChange = ({ target: { name, value } }) => {
    this.props.questionInputChange({ name, value })
  }
  onQuestionOptionChange = optionKey => ({ target }) => {
    const { name, value } = target
    this.props.questionOptionInputChange({ optionKey, name, value })
  }
  onQuestionSetCorrect = optionKey => () => {
    this.props.questionOptionSetCorrect(optionKey)
  }
  onSubmit = evt => {
    evt.preventDefault()
    const { questionForm, editQuestion, createQuestion } = this.props
    const payload = { ...questionForm, options: Object.values(questionForm.options) }
    const callback = questionForm.question_id ? editQuestion : createQuestion
    callback(payload, this.onRedirect)
  }
  render() {
    const { questionForm } = this.props
    const plusButton = <>&#10060;</>
    const downArrow = <>&#9660;&nbsp;&nbsp;</>
    const rightArrow = <>&#9658;&nbsp;&nbsp;</>

    return (
      <form onSubmit={this.onSubmit}>
        <h2>{questionForm.question_id ? "Edit" : "Create New"} Question</h2>
        <input
          type="text"
          maxLength={50}
          placeholder="Question title"
          name="question_title"
          value={questionForm.question_title}
          onChange={this.onQuestionChange}
        />
        <textarea
          maxLength={400}
          placeholder="Question text"
          name="question_text"
          value={questionForm.question_text}
          onChange={this.onQuestionChange}
        />
        <div className="options-heading">
          <h2>Options</h2><button className="option-operation" onClick={this.onAddOption}>➕</button>
        </div>
        {
          Object.keys(questionForm.options).map((optionKey, idx) => {
            const optionHeading = <>Option {idx + 1} &nbsp;&nbsp;</>
            const removeBtnDisabled = Object.keys(questionForm.options).length < 3
            const option = questionForm.options[optionKey]

            /* =============== 👉 9.1 STEP 3.1 =============== */
            const optionIsExpanded = this.state.optionBars[optionKey]
            const optionSlice = option.option_text.slice(0, 40)

            return (
              <div className={`option${option.is_correct ? " truthy" : ""}`} key={optionKey}>
                {/* =============== 👉 9.1 STEP 2.2 =============== */}
                <div className="option-bar" tabIndex="0" onClick={this.toggleBar(optionKey)}>
                  <span>
                    {/* =============== 👉 9.1 STEP 3.2 =============== */}
                    {optionIsExpanded ? downArrow : rightArrow}
                    {optionHeading}
                    {!optionIsExpanded && optionSlice}
                  </span>
                  <button
                    className="option-operation"
                    disabled={removeBtnDisabled}
                    onClick={this.onRemoveOption(optionKey)}>{plusButton}</button>
                </div>
                {
                  /* =============== 👉 9.1 STEP 4 =============== */
                  /* =============== 👉 9.1 STEP 5.2 =============== */
                  optionIsExpanded &&
                  <StyledInputGroup className="option-inputs">
                    <textarea
                      maxLength={400}
                      placeholder="Option text"
                      name="option_text"
                      value={option.option_text}
                      onChange={this.onQuestionOptionChange(optionKey)}
                    />
                    <textarea
                      type="text"
                      maxLength={400}
                      placeholder="Option remark"
                      name="remark"
                      value={option.remark ?? ''}
                      onChange={this.onQuestionOptionChange(optionKey)}
                    />
                    <label>
                      <input
                        type="radio"
                        name="is_correct"
                        checked={option.is_correct}
                        onChange={this.onQuestionSetCorrect(optionKey)}
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
          <button onClick={this.onRedirect}>Cancel</button>
        </div>
      </form >
    )
  }
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
