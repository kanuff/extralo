
export const fetchCards = list_id => {
  return $.ajax({
    method: "GET",
    url: `api/lists/${list_id}/cards`
  })
}

export const fetchCard = id => {
  return $.ajax({
    method: "GET",
    url: `api/cards/${id}`
  })
}

export const createCard = card => {
  return $.ajax({
    method: "POST",
    url: `api/lists/${card.list_id}/cards`,
    data: {
      card
    }
  })
}

export const updateCard = card => {
  return $.ajax({
    method: "PATCH",
    url: `api/cards/${card.id}`,
    data: {
      card
    }
  })
}

export const deleteCard = id => {
  return $.ajax({
    method: "DELETE",
    url: `api/cards/${id}`
  })
}