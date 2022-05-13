import { combineReducers } from 'redux'

const initialCount = 0
function count(state = initialCount, action) {
  return state
}

export default combineReducers({ count })
