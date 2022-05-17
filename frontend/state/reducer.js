import { combineReducers } from 'redux'
import * as types from './action-types'
import { getId } from '../../shared/utils'
const initialCount = 0
function count(state = initialCount, action) {
  return state
}

const initialAuthForm = {
  username: '', password: ''
}
function authForm(state = initialAuthForm, action) {
  switch (action.type) {
    case types.AUTH_FORM_RESET:
      return initialAuthForm
    case types.AUTH_FORM_INPUT_CHANGE:
      return { ...state, [action.payload.id]: action.payload.value }
    default:
      return state
  }
}

const initialQuestionForm = {
  question_title: '',
  question_text: '',
  question_hint: '',
  options: {
    [getId()]: { option_text: '', is_distractor: false, remark: '' },
    [getId()]: { option_text: '', is_distractor: true, remark: '' },
  }
}
function questionForm(state = initialQuestionForm, action) {
  switch (action.type) {
    case types.QUESTION_FORM_RESET:
      return initialAuthForm
    case types.QUESTION_FORM_INPUT_CHANGE: {
      return { ...state, [action.payload.name]: action.payload.value }
    }
    case types.QUESTION_FORM_OPTION_INPUT_CHANGE: {
      const { optionKey, name, value } = action.payload
      const optionToChange = state.options[optionKey]
      const changed = { ...optionToChange, [name]: value }
      return { ...state, options: { ...state.options, [optionKey]: changed } }
    }
    case types.QUESTION_FORM_OPTION_ADDITION: {
      const { options } = state
      if (Object.keys(options).length >= 10) return state
      return {
        ...state,
        options: {
          ...state.options,
          [action.payload]: { option_text: '', is_distractor: true, remark: '' }
        }
      }
    }
    case types.QUESTION_FORM_OPTION_REMOVAL: {
      const options = { ...state.options }
      if (Object.keys(options).length <= 2) return state
      delete options[action.payload]
      return { ...state, options }
    }
    default:
      return state
  }
}

const initialQuiz = { question: null, option_id: null }
function quiz(state = initialQuiz, action) {
  switch (action.type) {
    case types.SET_QUIZ:
      return { option_id: null, question: action.payload }
    case types.QUIZ_SET_SELECTED_OPTION:
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
