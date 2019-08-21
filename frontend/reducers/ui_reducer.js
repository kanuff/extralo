import { combineReducers } from 'redux';
import ModalReducer from './modal_reducer';
import BoardMembershipReducer from './board_membership_reducer'

export default combineReducers({
  modal: ModalReducer,
  membership: BoardMembershipReducer,
});

