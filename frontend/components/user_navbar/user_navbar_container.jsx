import { connect } from 'react-redux';
import UserNavbar from './user_navbar';
import { openModal, closeModal } from '../../actions/modal_actions';

const msp = state => {
  return {
    modal: state.ui.modal
  }
}

const mdp = dispatch => {
  return {
    openModal: modal => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
  }
}


export default connect(msp, mdp)(UserNavbar)