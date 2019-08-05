import * as ListAPIUtil from '../util/list_api_util';
import { receiveBoard } from './board_actions';

export const RECEIVE_LISTS = "RECEIVE_LISTS";
export const RECEIVE_LIST = "RECEIVE_LIST";

export const receiveLists = lists => {
    return {
        type: RECEIVE_LISTS,
        lists
    }
}

export const receiveList = list => {
    return {
        type: RECEIVE_LIST,
        list
    }
}

export const createList = (list, board_id) => dispatch => {
    return ListAPIUtil.createList(list, board_id)
                      .then( list => dispatch(receiveList(list)))
}

export const updateList = (list) => dispatch => {
    return ListAPIUtil.updateList(list)
                      .then( list => dispatch(receiveList(list)))
}

export const fetchLists = board_id => dispatch => {
   return ListAPIUtil.fetchLists(board_id)
                     .then( lists => dispatch(receiveLists(lists)))
}

export const deleteList = id => dispatch => {
    return ListAPIUtil.deleteList(id)
                     .then( () => dispatch(console.log(`List ${id} has been deleted`)))
}