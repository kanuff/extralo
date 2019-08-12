import { 
  RECEIVE_CURRENT_USER,
  RECEIVE_USERS,
 } from '../actions/session_actions'

export default (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {[action.user.id]: action.user})
    case RECEIVE_USERS:
      const users = objectified(action.users)
      return Object.assign({}, state, users)
    default:
      return state
  }
}


const objectified = (array) => {
  const obj = {}
  if (array) {
    array.map(board => {
      obj[board.id] = board
    })
    return obj
  }
}