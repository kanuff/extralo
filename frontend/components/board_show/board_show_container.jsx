import { connect } from 'react-redux';
import BoardShow from './board_show';
import { withRouter } from 'react-router-dom';
import { 
  fetchBoard, 
  destroyBoard,
  receiveErrors,
  clearErrors,
  updateBoard } from '../../actions/board_actions';
import {
  fetchLists
} from '../../actions/list_actions';

const msp = (state, ownProps) => {
  console.log(ownProps)
  const defaultBoard = {
    title: "Title",
    description: "Description",
    favorited: false,
    members: [],
  }
  return {
    board_id: ownProps.match.params.board_id,
    board: state.entities.boards[ownProps.match.params.board_id] || defaultBoard,
    history: ownProps.history,
    current_user_id: state.session.id,
    errors: state.errors.board,
  }
}

const mdp = (dispatch) => {
  return {
    fetchBoard: id => dispatch(fetchBoard(id)),
    destroyBoard: id => dispatch(destroyBoard(id)),
    updateBoard: board => dispatch(updateBoard(board)),
    receiveErrors: errors => dispatch(receiveErrors(errors)),
    clearErrors: () => dispatch(clearErrors()),
    fetchLists: board_id => dispatch(fetchLists(board_id)),
  }
}


export default withRouter(connect(msp, mdp)(BoardShow));