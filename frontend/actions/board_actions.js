import * as BoardAPIUtil from '../util/board_api_util';


export const RECEIVE_BOARDS = "RECEIVE_BOARDS"
export const RECEIVE_BOARD = "RECEIVE_BOARD"
export const CREATE_BOARD = "CREATE_BOARD"

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