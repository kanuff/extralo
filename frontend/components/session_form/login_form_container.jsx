import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login } from '../../actions/session_actions'


const msp = state => {
  return {
    currentUser: state.session.id,
    formType: "login-form",
    submitText: "Log In",
    welcomeMessage: "Log in to Extralo",
    otherForm: '/signup',
    otherFormButtonText: 'or create an account',
    errors: state.errors,
  }
}

const mdp = dispatch => {
  return {
    formAction: user => dispatch(login(user))
  }
}

export default connect(msp, mdp)(SessionForm);