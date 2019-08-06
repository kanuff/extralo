import React from 'react';
import { connect } from 'react-redux';
import { 
    updateCard,
    deleteCard,
    createCard,
    fetchCard,
} from '../../actions/card_actions';
import { withRouter } from 'react-router-dom';

const msp = (state, ownProps) => {

    const url = ownProps.location.pathname;
    const card_id = url.split("/").pop();
    return {
        card_id: card_id,
        card: state.entities.cards[card_id]
    }
}

const mdp = dispatch => {
    return {
        fetchCard: id => dispatch(fetchCard(id)),
    }
}

class CardShow extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchCard(this.props.card_id)
    }

    render(){
        return (
            <h1>{this.props.card.title}</h1>
        )
    }
}

export default withRouter(connect(msp,mdp)(CardShow));