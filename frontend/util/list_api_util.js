
export const fetchLists = (board_id) => {
    return $.ajax({
        method: "GET",
        url: `api/boards/${board_id}/lists`,
    })
}