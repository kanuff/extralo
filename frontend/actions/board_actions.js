import * as BoardAPIUtil from '../util/board_api_util';

export const RECEIVE_BOARDS = "RECEIVE_BOARDS"
export const RECEIVE_BOARD = "RECEIVE_BOARD"
export const CREATE_BOARD = "CREATE_BOARD"
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

export const receiveBoard = board => {
  return {
    type: RECEIVE_BOARD,
    board
  }
}

export const fetchBoards = () => dispatch => {
  return BoardAPIUtil.fetchBoards()
                     .then( boards => dispatch(receiveBoards(boards)))
}

export const fetchBoard = () => dispatch => {
  return BoardAPIUtil.fetchBoard()
                     .then( board => dispatch(receiveBoard(board)))
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
                     .then( () => dispatch(console.log(`Board ${id} has been deleted`)))
}