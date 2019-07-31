import { connect } from 'react-redux';
import SessionForm from './session_form';
import { 
  login,
  clearErrors
 } from '../../actions/session_actions'


const msp = state => {
  return {
    currentUser: state.session.id,
    formType: "login-form",
    submitText: "Log In",
    welcomeMessage: "Log in to Extralo",
    otherForm: '/signup',
    otherFormButtonText: 'or create an account',
    errors: state.errors,
    nameFieldDisplay: "hidden",
  }
}

const mdp = dispatch => {
  return {
    formAction: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(msp, mdp)(SessionForm);