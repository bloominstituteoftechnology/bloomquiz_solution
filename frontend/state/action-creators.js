import * as types from './action-types'
import axiosWithAuth from '../axios'
import { getId } from '../../shared/utils'
import axios from 'axios'

export function authInputChange({ id, value }) {
  return { type: types.AUTH_FORM_INPUT_CHANGE, payload: { id, value } }
}
export function questionInputChange({ name, value }) {
  return { type: types.QUESTION_FORM_INPUT_CHANGE, payload: { name, value } }
}
export function questionOptionInputChange({ optionKey, name, value }) {
  return { type: types.QUESTION_FORM_OPTION_INPUT_CHANGE, payload: { optionKey, name, value } }
}
export function questionOptionSetCorrect(optionKey) {
  return { type: types.QUESTION_FORM_SET_CORRECT_OPTION, payload: optionKey }
}
export function addOption() {
  return { type: types.QUESTION_FORM_OPTION_ADDITION, payload: getId() }
}
export function removeOption(optionKey) {
  return { type: types.QUESTION_FORM_OPTION_REMOVAL, payload: optionKey }
}
export function setMessage(message) {
  return { type: types.SET_INFO_MESSAGE, payload: message }
}
export function setQuiz(quiz) {
  return { type: types.SET_QUIZ, payload: quiz }
}
export function selectOption(option_id) {
  return { type: types.QUIZ_SET_SELECTED_OPTION, payload: option_id }
}
export function questionFormReset() {
  return { type: types.QUESTION_FORM_RESET }
}
export function setAuthStatus({ user, admin, username }) {
  return { type: types.SET_AUTH_STATUS, payload: { user, admin, username } }
}
export function flushAuthStatus() {
  return { type: types.FLUSH_AUTH_STATUS }
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
        dispatch(getAuthStatus())
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
export function createQuestion(question) {
  return function (dispatch) {
    axiosWithAuth().post('http://localhost:9000/api/questions', question)
      .then(res => {
        dispatch(setMessage(`${res.data.question_title} is a brilliant question`))
        dispatch(questionFormReset())
      })
      .catch(err => {
        const errToDisplay = err.response ? err.response.data.message : err.message
        dispatch(setMessage(errToDisplay))
      })
  }
}
export function getAuthStatus() {
  return function (dispatch) {
    axiosWithAuth().get('http://localhost:9000/api/auth/check')
      .then(res => {
        dispatch(setAuthStatus(res.data))
      })
      .catch(() => {
        dispatch(flushAuthStatus())
      })
  }
}
