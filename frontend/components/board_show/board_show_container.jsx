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
  fetchLists,
  clearLists
} from '../../actions/list_actions';
import {
  clearCards
} from '../../actions/card_actions';
import { openModal } from '../../actions/modal_actions'


const msp = (state, ownProps) => {
  const defaultBoard = {
    title: "Title",
    description: "Description",
    favorited: false,
    members: [],
    creator_id: 0,
  }
  const board = state.entities.boards[ownProps.match.params.board_id] || defaultBoard;
  const owner = state.entities.users[board.creator_id] || {name: "Matthew"};
  const ownerInitial = owner.name.split("")[0];
  return {
    board_id: ownProps.match.params.board_id,
    board: board,
    history: ownProps.history,
    current_user_id: state.session.id,
    errors: state.errors.board,
    ownerInitial: ownerInitial,
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
    clearLists: () => dispatch(clearLists()),
    clearCards: () => dispatch(clearCards()),
    openModal: modal => dispatch(openModal(modal)),
  }
}


export default withRouter(connect(msp, mdp)(BoardShow));