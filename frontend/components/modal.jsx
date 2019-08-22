import React from 'react';
import { closeModal, openModal } from '../actions/modal_actions';
import { connect } from 'react-redux';
import UserOptionsMenu from './user_navbar/user_options_menu';
import CreateBoardForm from './board_index/create_board_form';
import CardShow from './cards/card_show';
import NavbarInformation from './user_navbar/navbar_information';
import Notifications from './user_navbar/notifications';
import BoardNavigationMenu from './user_navbar/board_navigation_menu';
import MemberInvite from './board_show/member_invite';
import BoardOptionsMenu from './board_show/board_options_menu';

const Modal = ({modal, closeModal}) => {
  if(!modal){
    return null;
  }

  let component;
  let modalType;
  let permanent;
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
      modalType = "transparent elevated";
      break;
    case 'invite-members':
      component = <MemberInvite />
      modalType = "transparent";
      break;
    case 'card-show':
      component = <CardShow className={"card-show-form"}/>
      break
    case 'board-options-menu':
      component = <BoardOptionsMenu className={"board-options-menu"}/>
      modalType = "transparent elevated";
      // permanent = true;
      break
    default:
      return null;
  }

  const modalComponent = () => {
    if(permanent){
      return (
        <div className="modal-child" onClick={e => e.stopPropagation()}>
            {component}
        </div>
      )
    } else {
        return (
          <div className={`modal-background ${modalType}`} onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
              {component}
            </div>
          </div>
      )
    }
  }

  return (
    modalComponent()
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