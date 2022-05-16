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
  options: [
    {
      option_text_0: '',
      is_distractor_0: false,
      remark_0: '',
    },
    {
      option_text_1: '',
      is_distractor_1: true,
      remark_1: '',
    },
  ]
}
function questionForm(state = initialQuestionForm, action) {
  switch (action.type) {
    case types.QUESTION_FORM_RESET:
      return initialAuthForm
    case types.AUTH_FORM_INPUT_CHANGE: {
      const { id, value } = action.payload
      if (id in state) return { ...state, [id]: value }
      const changedOptions = state.options.map(opt => {
        return ((id in opt)) ? { ...opt, [id]: value } : opt
      })
      return { ...state, options: changedOptions }
    }
    case types.ADD_OPTION: {
      const { options } = state
      const nextIdx = options.length - 1
      if (nextIdx > 9) return state
      return {
        ...state, options: [
          ...options,
          {
            ['option_text_' + nextIdx]: '',
            ['is_distractor_' + nextIdx]: true,
            ['remark_' + nextIdx]: null,
          }
        ]
      }
    }
    case types.REMOVE_OPTION: {
      const { options } = state
      const option_id = action.payload
      if (options.length < 2) return state
      return {
        ...state, options: state.options
          .filter((opt) => opt.option_id !== option_id)
      }
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
