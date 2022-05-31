import React from 'react'
import { connect } from 'react-redux'
import {
  addOption,
  removeOption,
  inputChange,
  questionOptionSetCorrect,
  createQuestion,
  editQuestion,
} from '../state/action-creators'

export class QuizForm extends React.Component {
  onRedirect = path => evt => {
    if (evt) evt.preventDefault()
    this.props.navigate(path)
  }
  onAddOption = evt => {
    evt.preventDefault()
    this.props.addOption()
  }
  onRemoveOption = optionKey => evt => {
    evt.preventDefault()
    this.props.removeOption(optionKey)
  }
  onTextChange = ({ target: { name, value } }) => {
    this.props.inputChange({ name, value })
  }
  onQuestionSetCorrect = optionKey => () => {
    this.props.questionOptionSetCorrect(optionKey)
  }
  onSubmit = evt => {
    evt.preventDefault()
    const { quizForm, editQuestion, createQuestion } = this.props
    const payload = { ...quizForm, options: Object.values(quizForm.options) }
    const callback = quizForm.question_id ? editQuestion : createQuestion
    callback(payload, this.onRedirect('/'))
  }
  render() {
    const { quizForm } = this.props
    const plusButton = <>&#10060;</>
    const downArrow = <>&#9660;&nbsp;&nbsp;</>
    const rightArrow = <>&#9658;&nbsp;&nbsp;</>

    return (
      <form onSubmit={this.onSubmit}>
        <h2>{quizForm.question_id ? "Edit" : "Create New"} Question</h2>
        <input
          type="text"
          maxLength={50}
          placeholder="Question title"
          name="question_title"
          value={quizForm.question_title}
          onChange={this.onTextChange}
        />
        <textarea
          maxLength={400}
          placeholder="Question text"
          name="question_text"
          value={quizForm.question_text}
          onChange={this.onTextChange}
        />
        <div className="options-heading">
          <h2>Options</h2><button className="option-operation" onClick={this.onAddOption}>➕</button>
        </div>
        {
          Object.keys(quizForm.options).map((optionKey, idx) => {
            const optionHeading = <>Option {idx + 1} &nbsp;&nbsp;</>
            const removeBtnDisabled = Object.keys(quizForm.options).length < 3
            const option = quizForm.options[optionKey]

            return (
              <div className={`option${option.is_correct ? " truthy" : ""}`} key={optionKey}>
                <div className="option-bar" tabIndex="0">
                  <span>
                    {downArrow}
                    {optionHeading}
                  </span>
                  <button
                    className="option-operation"
                    disabled={removeBtnDisabled}
                    onClick={this.onRemoveOption(optionKey)}>{plusButton}</button>
                </div>
                <div className="option-inputs">
                  <textarea
                    maxLength={400}
                    placeholder="Option text"
                    name={`option_text-${optionKey}`}
                    value={option.option_text}
                    onChange={this.onTextChange}
                  />
                  <textarea
                    type="text"
                    maxLength={400}
                    placeholder="Option remark"
                    name={`remark-${optionKey}`}
                    value={option.remark ?? ''}
                    onChange={this.onTextChange}
                  />
                  <label>
                    <input
                      type="radio"
                      name="is_correct"
                      checked={option.is_correct}
                      onChange={this.onQuestionSetCorrect(optionKey)}
                    />&nbsp;&nbsp;correct option
                  </label>
                </div>
              </div>
            )
          })
        }
        <div className="button-group">
          <button className="jumbo-button">Submit</button>
          <button onClick={this.onRedirect('/admin')}>Cancel</button>
        </div>
      </form >
    )
  }
}

export default connect(st => ({
  quizForm: st.quizForm,
}), {
  addOption,
  removeOption,
  inputChange,
  questionOptionSetCorrect,
  createQuestion,
  editQuestion,
})(QuizForm)
