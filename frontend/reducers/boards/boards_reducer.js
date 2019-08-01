import {
  RECEIVE_BOARD,
  RECEIVE_BOARDS,
} from '../../actions/board_actions'


export default (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOARDS:
      return action.boards
    case RECEIVE_BOARD:
      return Object.assign({}, state, {[action.board.id]: action.board})
    default:
      return state
  }
}