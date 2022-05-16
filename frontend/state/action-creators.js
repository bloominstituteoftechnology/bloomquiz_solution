import * as types from './action-types'
import axiosWithAuth from '../axios'
import axios from 'axios'

export function inputChange({ id, value }) {
  return { type: types.AUTH_FORM_INPUT_CHANGE, payload: { id, value } }
}

export function setMessage(message) {
  return { type: types.SET_INFO_MESSAGE, payload: message }
}

export function setQuiz(quiz) {
  return { type: types.SET_QUIZ, payload: quiz }
}

export function selectOption(option_id) {
  return { type: types.SET_SELECTED_OPTION, payload: option_id }
}

export function register({ username, password }) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/auth/register', { username, password })
      .then(res => {
        dispatch(setMessage(res.data.message))
      })
      .catch(err => {
        const errToDisplay = err.response ? err.response.data.message : err.message
        dispatch(setMessage(errToDisplay))
      })
  }
}

export function login({ username, password }) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/auth/login', { username, password })
      .then(res => {
        localStorage.setItem('token', res.data.token)
        dispatch(setMessage(res.data.message))
      })
      .catch(err => {
        const errToDisplay = err.response ? err.response.data.message : err.message
        dispatch(setMessage(errToDisplay))
      })
  }
}

export function nextQuiz() {
  return function (dispatch) {
    axiosWithAuth().get('http://localhost:9000/api/quizzes/next')
      .then(res => {
        dispatch(setQuiz(res.data))
      })
      .catch(err => {
        const errToDisplay = err.response ? err.response.data.message : err.message
        dispatch(setMessage(errToDisplay))
      })
  }
}

export function answerQuiz({ question_id, option_id, user_id }) {
  return function (dispatch) {
    axiosWithAuth().post(
      'http://localhost:9000/api/quizzes/answer',
      { question_id, option_id, user_id }
    )
      .then(res => {
        dispatch(setMessage(`${res.data.verdict} ${res.data.remark}`))
      })
      .catch(err => {
        const errToDisplay = err.response ? err.response.data.message : err.message
        dispatch(setMessage(errToDisplay))
      })
      .finally(() => {
        dispatch(nextQuiz())
      })
  }
}
