import {
  RECEIVE_ERRORS,
  CLEAR_BOARD_ERRORS
} from '../../actions/board_actions'


export default (state=[], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ERRORS:
      return Object.assign([], action.errors.responseJSON)
    case CLEAR_BOARD_ERRORS:
      return []
    default:
      return state
  }
}