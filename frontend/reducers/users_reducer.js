import { 
  RECEIVE_CURRENT_USER,
  RECEIVE_USERS,
  CLEAR_USERS,
 } from '../actions/session_actions'

 import {
  RECEIVE_BOARD
 } from '../actions/board_actions'

export default (state={}, action) => {
  Object.freeze(state);
  let users;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {[action.user.id]: action.user})
    case RECEIVE_USERS:
      users = objectified(action.users)
      return Object.assign({}, state, users)
    case RECEIVE_BOARD:
      users = objectified(action.users)
      return Object.assign({}, state, users)
    case CLEAR_USERS:
      return Object.assign({})
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