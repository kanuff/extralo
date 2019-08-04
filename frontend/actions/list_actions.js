import * as ListAPIUtil from '../util/list_api_util';

export const RECEIVE_LISTS = "RECEIVE_LISTS";



export const receiveLists = lists => {
    return {
        type: RECEIVE_LISTS,
        lists
    }
}

export const fetchLists = board_id => dispatch => {
   return ListAPIUtil.fetchLists(board_id)
                     .then( boards => dispatch(receiveLists(boards)))
}