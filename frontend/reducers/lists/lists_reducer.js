import {
    RECEIVE_LISTS,
    RECEIVE_LIST
} from '../../actions/list_actions';

export default (state={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LISTS:
            return objectified(action.lists)
        case RECEIVE_LIST:
            return Object.assign({}, state, {[action.list.id]: action.list})
        default:
            return state
    }
}


const objectified = (array) => {
    const obj = {}
    array.map(board => {
        obj[board.id] = board
    })
    return obj
}