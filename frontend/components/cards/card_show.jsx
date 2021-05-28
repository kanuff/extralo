import React from 'react';
import { connect } from 'react-redux';
import { 
    updateCard,
    deleteCard,
    createCard,
    fetchCard,
} from '../../actions/card_actions';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../actions/modal_actions'

const msp = (state, ownProps) => {

    const url = ownProps.location.pathname;
    const card_id = url.split("/").pop();
    const board_id = url.split("/")[2]
    const card = state.entities.cards[card_id]
    return {
        card_id: card_id,
        card: card,
        board_id: board_id,
        list: state.entities.lists[card.list_id]
    }
}

const mdp = dispatch => {
    return {
        fetchCard: id => dispatch(fetchCard(id)),
        updateCard: card => dispatch(updateCard(card)),
        deleteCard: id => dispatch(deleteCard(id)),
        closeModal: () => dispatch(closeModal()),
    }
}

class CardShow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: props.card.title,
            description: props.card.description || "",
            id: props.card_id,
        }
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.archiveCard = this.archiveCard.bind(this);
    }

    archiveCard(){
        this.props.deleteCard(this.state.id)
                  .then( () => this.props.closeModal() )
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
            description: this.state.description,
            id: this.state.id,
        }
        e.preventDefault()
        this.props.updateCard(card)
    }

    render(){
        return (
            <section className={"card-show-container"}>
                <form onSubmit={this.handleSubmit} className={"card-show-title"}>
                    <input
                        id={`card-title-input_${this.props.card_id}`}
                        type="text"
                        value={this.state.title}
                        onChange={this.update("title")}
                        onBlur={this.handleSubmit}
                    />
                    in list {`${this.props.list.title}`}
                </form>
                <form onSubmit={this.handleSubmit} className={"card-show-description"}>
                    Description
                    <textarea
                        id={`card-description-input_${this.props.card_id}`}
                        // type="text"
                        value={this.state.description}
                        onChange={this.update("description")}
                        onBlur={this.handleSubmit}
                        placeholder="Add a description..."
                    />
                    <input type="submit" value="Update"/>
                </form>
                <button onClick={this.archiveCard}>Archive Thought</button>
            </section>

        )
    }
}

export default withRouter(connect(msp,mdp)(CardShow));