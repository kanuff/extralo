

export const addMember = (user_id, board_id) => {
    return $.ajax({
        method: "POST",
        url: `api/boards/${board_id}/board_memberships`,
        data: {
            board_membership: user_id
        }
    })
}