import { 
  RECEIVE_ERRORS,
  RECEIVE_CURRENT_USER 
} from '../actions/session_actions';


export default (state=[], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ERRORS:
      return Object.assign([], action.errors.responseJSON)
    case RECEIVE_CURRENT_USER:
      return []
    default:
      return state
  }
}