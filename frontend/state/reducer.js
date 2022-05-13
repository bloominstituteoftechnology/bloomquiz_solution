import { combineReducers } from 'redux'

const initialCount = 0
function count(state = initialCount, action) {
  return state
}

const initialAuthForm = {
  username: '', password: ''
}
function authForm(state = initialAuthForm, action) {
  return state
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

export default combineReducers({
  count,
  authForm,
  questionForm,
})
