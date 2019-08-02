import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions'

const msp = state => {
  return {
    current_user: state.entities.users[state.session.id]
  }
}

const mdp = dispatch => {
  return{
    logout: () => dispatch(logout()),
  }
}

const UserOptionsMenu = (props) => {
  let name;
  let email;
  if(props.current_user){
    name = props.current_user.name;
    email = props.current_user.email;
  }
    return (
      <ul className="user-options">
        <li id={"user-options-title"}>{name} ({email})</li>
        <hr className={"menu-line"}></hr>
        <li onClick={props.logout}>Logout</li>
      </ul>
    )
}

export default connect(msp, mdp)(UserOptionsMenu)