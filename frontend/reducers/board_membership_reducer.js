import {
    RECEIVE_MEMBERSHIP_STATUS,
    CLEAR_MEMBERSHIP_STATUS,
} from '../actions/board_membership_actions'

import {
    CLOSE_MODAL,
} from '../actions/modal_actions'



export default (state=[], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_MEMBERSHIP_STATUS:
            return Object.assign([], action.status)
        case CLEAR_MEMBERSHIP_STATUS:
            return []
        case CLOSE_MODAL:
            return []
        default:
            return state
    }
}