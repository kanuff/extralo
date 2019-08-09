import React from 'react';
import { closeModal, openModal } from '../actions/modal_actions';
import { connect } from 'react-redux';
import UserOptionsMenu from './user_navbar/user_options_menu';
import CreateBoardForm from './board_index/create_board_form';
import CardShow from './cards/card_show';
import NavbarInformation from './user_navbar/navbar_information';
import Notifications from './user_navbar/notifications';
import BoardNavigationMenu from './user_navbar/board_navigation_menu';

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
    case 'information':
      component = <NavbarInformation />
      modalType = "transparent"
      break;
    case 'notifications':
      component = <Notifications />
      modalType = "transparent"
      break;
    case 'board-navigation-menu':
      component = <BoardNavigationMenu />
      modalType = "transparent";
      break;
    case 'card-show':
      component = <CardShow className={"card-show-form"}/>
      break
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