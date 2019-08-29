import * as BoardAPIUtil from '../util/board_api_util';

export const RECEIVE_BOARDS = "RECEIVE_BOARDS"
export const RECEIVE_BOARD = "RECEIVE_BOARD"
export const CLEAR_BOARD_ERRORS = "CLEAR_BOARD_ERRORS"
export const RECEIVE_ERRORS = "RECEIVE_ERRORS"

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_ERRORS,
    errors
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_BOARD_ERRORS,
  }
}

export const receiveBoards = boards => {
  return {
    type: RECEIVE_BOARDS,
    boards
  }
}

export const receiveBoard = payload => {
  return {
    type: RECEIVE_BOARD,
    board: payload.board,
    lists: payload.lists,
    cards: payload.cards,
    users: payload.users,
  }
}

export const fetchBoards = () => dispatch => {
  return BoardAPIUtil.fetchBoards()
                     .then( boards => dispatch(receiveBoards(boards)))
}

export const fetchBoard = (id) => dispatch => {
  return BoardAPIUtil.fetchBoard(id)
                     .then( payload => dispatch(receiveBoard(payload)))
}

export const createBoard = board => dispatch => {
  return BoardAPIUtil.createBoard(board)
                     .then( board => dispatch(receiveBoard(board)))
}

export const updateBoard = board => dispatch => {
  return BoardAPIUtil.updateBoard(board)
                     .then( board => dispatch(receiveBoard(board)))
}

export const destroyBoard = id => dispatch => {
  return BoardAPIUtil.destroyBoard(id)
}