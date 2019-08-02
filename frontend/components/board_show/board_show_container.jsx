import { connect } from 'react-redux';
import BoardShow from './board_show';
import { withRouter } from 'react-router-dom';
import { fetchBoard } from '../../actions/board_actions';

const msp = (state, ownProps) => {
  const defaultBoard = {
    title: "Title",
    description: "Description",
    favorited: false,
    members: [],
  }
  return {
    board_id: ownProps.match.params.board_id,
    board: state.entities.boards[ownProps.match.params.board_id] || defaultBoard
  }
}

const mdp = dispatch => {
  return {
    fetchBoard: id => dispatch(fetchBoard(id)),
  }
}


export default withRouter(connect(msp, mdp)(BoardShow));