import {
  RECEIVE_CARDS,
  RECEIVE_CARD,
  CLEAR_CARDS
} from '../../actions/card_actions';

// import RECEIVE_LIST from '../../actions/list_actions';
// import RECEIVE_BOARDS from '../../actions/board_actions';

export default (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CARDS:
      return Object.assign({},state,objectified(action.cards))
    // case RECEIVE_LIST:
    //   return objectified(action.lists.card_ids)
    case RECEIVE_CARD:
      return Object.assign({}, state, {[action.card.id]: action.card})
    case CLEAR_CARDS:
      return {}
    default:
      return state
  }
}

const objectified = (array) => {
  const obj = {}
  array.map(board => {
    obj[board.id] = board
  })
  return obj
}