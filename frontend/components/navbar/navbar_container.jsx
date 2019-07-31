import { connect } from 'react-redux';
import Navbar from './navbar';
import { 
  demoLogin,
  logout } from '../../actions/session_actions'

const msp = state => {
  return {
    currentUser: state.entities.users[state.session.id],
  }
}


const mdp = dispatch => {
  return {
    logout: () => dispatch(logout()),
    demoLogin: () => dispatch(demoLogin()),
  }
}

export default connect(msp, mdp)(Navbar)