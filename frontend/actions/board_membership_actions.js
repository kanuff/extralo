import * as BoardMembershipAPIUtil from '../util/board_membership_api_util';
export const RECEIVE_MEMBERSHIP_STATUS = "RECEIVE_MEMBERSHIP_STATUS";
export const CLEAR_MEMBERSHIP_STATUS = "CLEAR_MEMBERSHIP_STATUS";


export const addMember = (user_id, board_id) => dispatch => {
    return BoardMembershipAPIUtil.addMember(user_id, board_id)
                .then( status => dispatch(receiveMembershipStatus(status)))
}

export const clearMembershipStatus = () => {
    return {
        type: CLEAR_MEMBERSHIP_STATUS,
    }
}

export const receiveMembershipStatus = membershipStatus => {
    return {
        type: RECEIVE_MEMBERSHIP_STATUS,
        status: membershipStatus,
    }
}
