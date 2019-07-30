import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup } from '../../actions/session_actions'


const msp = state => {
  return {
    currentUser: state.session.id,
    formType: "signup-form",
    submitText: "Create New Account",
    otherForm: '/login',
    otherFormButtonText: 'or sign into your account'
  }
}

const mdp = dispatch => {
  return {
    formAction: user => dispatch(signup(user))
  }
}

export default connect(msp,mdp)(SessionForm);