import { connect } from 'react-redux';
import SessionForm from './session_form';
import { 
  signup,
  clearErrors
 } from '../../actions/session_actions'


const msp = state => {
  return {
    currentUser: state.session.id,
    formType: "signup-form",
    submitText: "Create New Account",
    welcomeMessage: "Create an Extralo account",
    otherForm: '/login',
    otherFormButtonText: 'or sign into your account',
    errors: state.errors,
    nameFieldDisplay: "show",
  }
}

const mdp = dispatch => {
  return {
    formAction: user => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors())

  }
}

export default connect(msp,mdp)(SessionForm);