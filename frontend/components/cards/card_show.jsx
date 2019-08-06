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
        updateCard: card => dispatch(updateCard(card)),
    }
}

class CardShow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: props.card.title,
            description: props.card.description,
            id: props.card_id,
        }
        this.update = this.update.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.props.fetchCard(this.props.card_id)
    }

    update(field) {
        return (e) => {
            this.setState({
                [field]: e.target.value,
            })
        }
    }

    handleSubmit(e) {
        const card = {
            title: this.state.title,
            id: this.state.id
        }
        e.preventDefault()
        this.props.updateCard(card)
    }

    render(){
        return (
            <form action="">
                <input
                    id={`card-title-input_${this.props.card_id}`}
                    type="text"
                    value={this.state.title}
                    onChange={this.update("title")}
                    onBlur={this.handleSubmit}
                />
            </form>
        )
    }
}

export default withRouter(connect(msp,mdp)(CardShow));