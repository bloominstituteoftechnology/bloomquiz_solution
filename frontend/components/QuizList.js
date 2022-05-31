import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function QuizList(props) {
  const {
    questionFormReset,
    getQuestionBy,
    getQuizzes,
    quizList,
    navigate,
    setQuiz,
    quiz,
    searchText,
    inputChange,
  } = props

  const onNew = () => {
    questionFormReset()
    navigate('/admin/quiz/edit')
  }

  const onView = question_id => () => {
    setQuiz(quizList.find(q => q.question_id === question_id))
    navigate('/')
  }

  const onSearch = () => {
    getQuestionBy({ searchText })
  }

  const isSearchDisabled = () => {
    return !searchText.trim().length
  }

  const onSearchTextChange = evt => {
    const { name, value } = evt.target
    inputChange({ name, value })
  }

  const onSearchClear = () => {
    inputChange({ name: 'searchText', value: '' })
    getQuizzes()
  }

  useEffect(() => {
    searchText.trim().length
      ? getQuestionBy({ searchText })
      : getQuizzes()
  }, [])

  return (
    <div id="quizList">
      <div className="button-group">
        <button className="jumbo-button" onClick={onNew}>New Quiz</button>
      </div><br />
      <div className="search-bar">
        <input name="searchText" onChange={onSearchTextChange} value={searchText} />
        <button disabled={isSearchDisabled()} onClick={onSearch}>search</button>
        <button disabled={isSearchDisabled()} onClick={onSearchClear}>clear</button>
      </div>
      {
        quizList.map(q => {
          const quizIsLoaded = quiz.question && q.question_id === quiz.question.question_id
          return (
            <div className={`question answer${quizIsLoaded ? ' selected' : ''}`} key={q.question_id}>
              {q.question_title}
              <div className="mini-group">
                <button onClick={onView(q.question_id)}>👓</button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default connect(st => ({
  quizList: st.quizList,
  setQuiz: st.setQuiz,
  quiz: st.quiz,
  searchText: st.quizSearchForm.searchText,
}), {
  questionFormReset: actions.questionFormReset,
  getQuestionBy: actions.getQuestionBy,
  getQuizzes: actions.getQuizzes,
  setQuiz: actions.setQuiz,
  inputChange: actions.inputChange,
})(QuizList)
