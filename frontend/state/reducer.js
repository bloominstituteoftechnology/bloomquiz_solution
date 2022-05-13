import { combineReducers } from 'redux'
import * as types from './action-types'

const initialCount = 0
function count(state = initialCount, action) {
  return state
}

const initialAuthForm = {
  username: '', password: ''
}
function authForm(state = initialAuthForm, action) {
  switch (action.type) {
    case types.RESET_FORM:
      return initialAuthForm
    case types.INPUT_CHANGE: {
      const { id } = action.payload
      if (id === 'username' || id === 'password') {
        return { ...state, [action.payload.id]: action.payload.value }
      }
      return state
    }
    default:
      return state
  }
}

const initialQuestionForm = {
  question_title: '',
  question_text: '',
  question_hint: null,
  options: [
    {
      option_text: '',
      is_distractor: false,
      remark: null,
    },
    {
      option_text: '',
      is_distractor: true,
      remark: null,
    },
  ]
}
function questionForm(state = initialQuestionForm, action) {
  return state
}

const initialQuiz = { question: null, option_id: null }
function quiz(state = initialQuiz, action) {
  switch (action.type) {
    case types.SET_QUIZ:
      return { option_id: null, question: action.payload }
    case types.SET_SELECTED_OPTION:
      return { ...state, option_id: action.payload }
    default:
      return state
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case types.SET_INFO_MESSAGE:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  count,
  authForm,
  questionForm,
  quiz,
  infoMessage,
})
