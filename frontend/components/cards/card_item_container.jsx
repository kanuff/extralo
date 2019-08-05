import { connect } from 'react-redux';
import CardItem from './card_item';
import {
  updateCard,
  createCard,
} from '../../actions/card_actions'

const msp = state => {
  return {

  }
}

const mdp = dispatch => {
  return {
    updateCard: card => dispatch(updateCard(card)),
    createCard: card => dispatch(createCard(card)),
  }
}

export default connect(msp, mdp)(CardItem)