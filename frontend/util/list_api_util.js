
export const fetchLists = (board_id) => {
    return $.ajax({
        method: "GET",
        url: `api/boards/${board_id}/lists`,
    })
}


export const createList = (list, board_id) => {
    return $.ajax({
        method: "POST",
        url: `api/boards/${board_id}/lists`,
        data: {
            list
        }
    })
}

export const updateList = (list) => {
    return $.ajax({
        method: "PATCH",
        url: `api//lists/${list.id}`,
        data: {
            list
        }
    })
}

export const deleteList = id => {
    return $.ajax({
        method: "DELETE",
        url: `api/lists/${id}`
    })
}