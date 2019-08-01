import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../actions/modal_actions'

export default (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal
    case CLOSE_MODAL:
      return {}
    default:
      return state
  }
}