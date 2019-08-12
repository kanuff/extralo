import BoardIndex from './board_index';
import { connect } from 'react-redux';
import { fetchBoards } from '../../actions/board_actions';
import { openModal, closeModal } from '../../actions/modal_actions';



const msp = state => {
  return {
    boards: Object.values(state.entities.boards),
    current_user: state.entities.users[state.session.id],
  }
}

const mdp = dispatch => {
  return {
    fetchBoards: () => dispatch(fetchBoards()),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
  }
}

export default connect(msp, mdp)(BoardIndex);