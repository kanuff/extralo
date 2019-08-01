import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions'

const mdp = dispatch => {
  return{
    logout: () => dispatch(logout()),
  }
}

const UserOptionsMenu = (props) => {
    return (
      <ul className="user-options">
        <li onClick={props.logout}>
          Logout
        </li>
      </ul>
    )
}

export default connect(null, mdp)(UserOptionsMenu)