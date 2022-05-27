import * as types from './action-types'
import axiosWithAuth from '../axios'
import { getId, initialQuestionForm } from '../../shared/utils'
import axios from 'axios'

export function spinnerOn() {
  return { type: types.SPINNER_ON }
}
export function spinnerOff() {
  return { type: types.SPINNER_OFF }
}
export function authInputChange({ name, value }) {
  return { type: types.AUTH_FORM_INPUT_CHANGE, payload: { name, value } }
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
export function setQuiz(quiz) {
  return { type: types.SET_QUIZ, payload: quiz }
}
export function selectOption(option_id) {
  return { type: types.QUIZ_SET_SELECTED_OPTION, payload: option_id }
}
export function setAuthStatus({ user, admin }) {
  return { type: types.SET_AUTH_STATUS, payload: { user, admin } }
}
export function setGeneralStats({ corrects, incorrects }) {
  return { type: types.SET_GENERAL_STATS, payload: { corrects, incorrects } }
}
export function setAllQuestions(questions) {
  return { type: types.SET_ALL_QUIZZES, payload: questions }
}
export function reset() {
  return { type: types.RESET }
}
export function questionFormReset() {
  return {
    type: types.QUESTION_FORM_RESET,
    payload: initialQuestionForm(),
  }
}
export function questionFormSetExisting(question) {
  const keys = question.options.map(getId)
  const options = {}
  keys.forEach((key, idx) => {
    options[key] = question.options[idx]
  })
  return {
    type: types.QUESTION_FORM_SET_EXISTING,
    payload: { ...question, options }
  }
}
export function setMessage({ main, code }) {
  window.scrollTo(0, 0)
  return {
    type: types.SET_INFO_MESSAGE, payload: {
      main, time: new Date().valueOf(), code
    }
  }
}
function setError(err, dispatch) {
  const errToDisplay = err.response ? err.response.data.message : err.message
  dispatch(setMessage({ main: errToDisplay, code: 'red' }))
}
export function register({ username, password }) {
  return function (dispatch) {
    dispatch(spinnerOn())
    axios.post('http://localhost:9000/api/auth/register', { username, password })
      .then(res => {
        dispatch(spinnerOff())
        dispatch(setMessage({ main: res.data.message }))
        dispatch(login({ username, password }))
      })
      .catch(err => {
        dispatch(spinnerOff())
        setError(err, dispatch)
      })
  }
}
export function login({ username, password }) {
  return function (dispatch) {
    dispatch(spinnerOn())
    axios.post('http://localhost:9000/api/auth/login', { username, password })
      .then(res => {
        localStorage.setItem('token', res.data.token)
        dispatch(spinnerOff())
        dispatch(setMessage({ main: res.data.message }))
        dispatch(getAuthStatus())
      })
      .catch(err => {
        dispatch(spinnerOff())
        setError(err, dispatch)
      })
  }
}
export function nextQuiz() {
  return function (dispatch) {
    dispatch(spinnerOn())
    axiosWithAuth().get('http://localhost:9000/api/quizzes/next')
      .then(res => {
        dispatch(spinnerOff())
        dispatch(setQuiz(res.data))
      })
      .catch(err => {
        dispatch(spinnerOff())
        setError(err, dispatch)
      })
  }
}
export function answerQuiz({ question_id, option_id, user_id }) {
  return function (dispatch) {
    dispatch(spinnerOn())
    axiosWithAuth().post(
      'http://localhost:9000/api/quizzes/answer',
      { question_id, option_id, user_id }
    )
      .then(res => {
        dispatch(spinnerOff())
        dispatch(setMessage({
          main: `${res.data.verdict}`,
          code: res.data.is_correct ? 'green' : 'red',
        }))
        dispatch(nextQuiz())
      })
      .catch(err => {
        dispatch(spinnerOff())
        setError(err, dispatch)
      })
  }
}
export function createQuestion(question, redirect) {
  return function (dispatch) {
    axiosWithAuth().post('http://localhost:9000/api/questions', question)
      .then(res => {
        dispatch(setMessage({ main: `${res.data.question_title} is a brilliant question` }))
        dispatch(questionFormReset())
        dispatch(setQuiz(res.data))
        redirect()
      })
      .catch(err => {
        setError(err, dispatch)
      })
  }
}
export function editQuestion(question, redirect) {
  return function (dispatch) {
    axiosWithAuth().put('http://localhost:9000/api/questions/' + question.question_id, question)
      .then(res => {
        dispatch(setMessage({ main: `Brilliant update` }))
        dispatch(questionFormReset())
        dispatch(setQuiz(res.data))
        redirect()
      })
      .catch(err => {
        setError(err, dispatch)
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
        dispatch(reset())
      })
  }
}
export function getGeneralStats() {
  return function (dispatch) {
    axiosWithAuth().get('http://localhost:9000/api/stats/general')
      .then(res => {
        dispatch(setGeneralStats(res.data))
      })
      .catch(() => {
        dispatch(reset())
      })
  }
}
export function getQuizzes() {
  return function (dispatch) {
    dispatch(spinnerOn())
    axiosWithAuth().get('http://localhost:9000/api/questions')
      .then(res => {
        dispatch(setAllQuestions(res.data))
      })
      .catch(() => {
        dispatch(reset())
      })
      .finally(() => {
        dispatch(spinnerOff())
      })
  }
}
