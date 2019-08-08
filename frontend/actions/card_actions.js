import * as CardAPIUtil from '../util/card_api_util';

export const RECEIVE_CARDS = "RECEIVE_CARDS";
export const RECEIVE_CARD = "RECEIVE_CARD";
export const CLEAR_CARDS = "CLEAR_CARDS";
export const RECEIVE_AND_UPDATE_CARDS = "RECEIVE_AND_UPDATE_CARDS";

export const clearCards = () => {
  return {
    type: CLEAR_CARDS,
  }
}
export const receiveCards = cards => {
  return {
    type: RECEIVE_CARDS,
    cards
  }
}

export const receiveCard = card => {
  return {
    type: RECEIVE_CARD,
    card
  }
}

export const receiveAndUpdateCards = cards => {
  return {
    type: RECEIVE_AND_UPDATE_CARDS,
    cards
  }
}

export const fetchCards = list_id => dispatch => {
  return CardAPIUtil.fetchCards(list_id)
    .then(cards => dispatch(receiveCards(cards)));
}

export const fetchCard = id => dispatch => {
  return CardAPIUtil.fetchCard(id)
    .then(card => dispatch(receiveCard(card)));
}


// this action receives multiple cards in response to creating just a single card
// because of the nature of linked-lists
export const createCard = card => dispatch => {
  return CardAPIUtil.createCard(card)
    .then(cards => dispatch(receiveAndUpdateCards(cards)));
}

export const updateCard = card => dispatch => {
  return CardAPIUtil.updateCard(card)
    .then(cards => dispatch(receiveAndUpdateCards(cards)));
}

export const deleteCard = id => dispatch => {
  return CardAPIUtil.deleteCard(id)
    .then(cards => dispatch(receiveAndUpdateCards(cards)))
}