import {
    RECEIVE_LISTS,
    RECEIVE_LIST,
    CLEAR_LISTS,
    RECEIVE_AND_UPDATE,
} from '../../actions/list_actions';
import {
    RECEIVE_BOARD
} from '../../actions/board_actions'

export default (state={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LISTS:
            return objectified(action.lists)
        case RECEIVE_BOARD:
            return objectified(action.lists)
        case RECEIVE_LIST:
            return Object.assign({}, state, {[action.list.id]: action.list})
        case RECEIVE_AND_UPDATE:
            const lists = objectified(action.lists)
            return Object.assign({}, state, lists)
        case CLEAR_LISTS:
            return {}
        default:
            return state
    }
}

const objectified = (array) => {
    const obj = {}
    if (array){
        array.map(board => {
            obj[board.id] = board
        })
        return obj
    }
}