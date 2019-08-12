import * as BoardMembershipAPIUtil from '../util/board_membership_api_util';


export const addMember = (user_id, board_id) => dispatch => {
    return BoardMembershipAPIUtil.addMember(user_id, board_id)
}