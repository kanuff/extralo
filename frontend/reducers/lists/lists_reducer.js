import {
    RECEIVE_LISTS
} from '../../actions/list_actions';

export default (state={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LISTS:
            return objectified(action.lists)
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