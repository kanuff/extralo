import BoardIndex from './board_index';
import { connect } from 'react-redux';
import { fetchBoards } from '../../actions/board_actions';



const msp = state => {
  return {
    boards: state.entities.boards
  }
}

const mdp = dispatch => {
  return {
    fetchBoards: () => dispatch(fetchBoards())
  }
}

export default connect(msp, mdp)(BoardIndex);