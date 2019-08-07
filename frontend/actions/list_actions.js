import * as ListAPIUtil from '../util/list_api_util';

export const RECEIVE_LISTS = "RECEIVE_LISTS";
export const RECEIVE_LIST = "RECEIVE_LIST";
export const CLEAR_LISTS = "CLEAR_LISTS";
export const RECEIVE_AND_UPDATE = "RECEIVE_AND_UPDATE";

export const clearLists = () => {
    return {
        type: CLEAR_LISTS,
    }
}
export const receiveLists = lists => {
    return {
        type: RECEIVE_LISTS,
        lists,
    }
}

export const receiveList = list => {
    return {
        type: RECEIVE_LIST,
        list
    }
}

export const receiveAndUpdateLists = lists => {
    return{
        type: RECEIVE_AND_UPDATE,
        lists
    }
}

export const fetchLists = board_id => dispatch => {
    return ListAPIUtil.fetchLists(board_id)
        .then(lists => dispatch(receiveLists(lists)))
}

// this action receives multiple lists in response to creating just one by design
export const createList = (list, board_id) => dispatch => {
    return ListAPIUtil.createList(list, board_id)
                      .then( lists => dispatch(receiveAndUpdateLists(lists)))
}

export const updateList = (list) => dispatch => {
    return ListAPIUtil.updateList(list)
                      .then( lists => dispatch(receiveAndUpdateLists(lists)))
}

export const deleteList = id => dispatch => {
    return ListAPIUtil.deleteList(id)
                     .then( lists => dispatch(receiveAndUpdateLists(lists)))
}