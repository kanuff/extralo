import React from 'react';
import { closeModal, openModal } from '../actions/modal_actions';
import { connect } from 'react-redux';
import UserOptionsMenu from './user_navbar/user_options_menu';
import CreateBoardForm from './board_index/create_board_form';

const Modal = ({modal, closeModal}) => {
  if(!modal){
    return null;
  }

  let component;
  let modalType;
  switch (modal) {
    case 'user-options':
      component = <UserOptionsMenu />
      modalType = "transparent"
      break;
    case 'create-board':
      component = <CreateBoardForm />
      break;
    default:
      return null;
  }

  return (
    <div className={`modal-background ${modalType}`} onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const msp = state => {
  return {
    modal: state.ui.modal
  }
}

const mdp = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
  }
}

export default connect(msp, mdp)(Modal);