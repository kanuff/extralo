import * as CardAPIUtil from '../util/card_api_util';

export const RECEIVE_CARDS = "RECEIVE_CARDS";
export const RECEIVE_CARD = "RECEIVE_CARD";
export const CLEAR_CARDS = "CLEAR_CARDS";

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

export const createCard = card => dispatch => {
  return CardAPIUtil.createCard(card)
                    .then( card => dispatch (receiveCard(card)));
}

export const updateCard = card => dispatch => {
  return CardAPIUtil.updateCard(card)
                    .then( card => dispatch(receiveCard(card)));
}

export const fetchCards = list_id => dispatch => {
  return CardAPIUtil.fetchCards(list_id)
                    .then( cards => dispatch(receiveCards(cards)));
}

export const fetchCard = id => dispatch => {
  return CardAPIUtil.fetchCard(id)
                    .then( card => dispatch(receiveCard(card)));
}

export const deleteCard = id => dispatch => {
  return CardAPIUtil.deleteCard(id)
                    .then( card => dispatch(receiveCard(card)))
}