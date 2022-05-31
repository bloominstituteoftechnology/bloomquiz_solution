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
    quizSearch,
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
    const { searchText } = quizSearch
    getQuestionBy({ searchText })
  }

  const onSearchTextChange = evt => {
    const { name, value } = evt.target
    inputChange({ name, value })
  }

  const isSearchDisabled = () => {
    const { searchText } = quizSearch
    return !searchText.trim().length
  }

  useEffect(() => {
    const { searchText } = quizSearch
    if (searchText.trim().length) {
      getQuestionBy({ searchText })
    } else {
      getQuizzes()
    }
  }, [])

  return (
    <div id="quizList">
      <div className="button-group">
        <button className="jumbo-button" onClick={onNew}>New Quiz</button>
      </div><br />
      <div className="search-bar">
        <input name="searchText" onChange={onSearchTextChange} value={quizSearch.searchText}></input>
        <button disabled={isSearchDisabled()} onClick={onSearch}>search</button>
        <button onClick={getQuizzes}>clear</button>
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

export default connect(st => st, actions)(QuizList)
