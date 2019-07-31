import { connect } from 'react-redux';
import Splashpage from './splashpage';
import { demoLogin } from '../../actions/session_actions'


const mdp = dispatch => {
  return {
    demoLogin: () => dispatch(demoLogin())
  }
}

export default connect(null, mdp)(Splashpage)