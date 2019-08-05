import React from 'react';
import { connect } from 'react-redux';
import { updateList } from '../../actions/list_actions';
import { 
    fetchCards,
    createCard,
 } from '../../actions/card_actions';
import CardItem from '../cards/card_item_container';

const msp = state => {
    return {
        cards: Object.values(state.entities.cards),
    }
}

const mdp = dispatch => {
    return {
        updateList: list => dispatch(updateList(list)),
        fetchCards: list_id => dispatch(fetchCards(list_id)),
        createCard: card => dispatch(createCard(card)),
    }
}


class ListIndexItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: props.list.title,
            id: props.list.id,
            formVisible: false,
            cardTitle: ""
        }
        this.cardIds = props.list.card_ids
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formToggle = this.formToggle.bind(this);
        this.handleCardSubmit = this.handleCardSubmit.bind(this);
    }

    componentDidUpdate(){
        this.listIndexBottom.scrollIntoView();
    }

    handleSubmit(e) {
        const list = {
            title: this.state.title,
            id: this.state.id
        }
        e.preventDefault()
        document.getElementById(`list-title-input_${this.props.list.id}`).blur();
        this.props.updateList(list)
    }

    handleCardSubmit(e){
        const card = {
            title: this.state.cardTitle,
            list_id: this.state.id,
        }
        e.preventDefault()
        e.persist()
        this.props.createCard(card)
                 .then( () => {
                     this.setState({cardTitle: ""});
                     e.target.reset();
                    })
    }

    update(field) {
        return (e) => {
            this.setState({
                [field]: e.target.value,
            })
        }
    }

    cardForm(){
        if (this.state.formVisible){
            return (
                <form className={"create-card-form"} onSubmit={this.handleCardSubmit}>
                    <input
                        type="text"
                        placeholder={"Enter a title for this card..."}
                        onChange={this.update("cardTitle")}
                    />
                    <div>
                        <input 
                            type="submit" 
                            value={"Add Card"}
                        />
                        <button onClick={this.formToggle}> x </button>
                    </div>
                </form>
            )
        } else {
            return (
                <>
                </>
            )
        }
    }

    addCardForm(){
        if (this.state.formVisible) {
            return (
                <>
                </>
            )
        } else {
            return(
                <button id={"add-card-btn"} onClick={this.formToggle}>
                    + Add another card
                </button>
            )
        }

    }

    formToggle() {
        this.setState({
            formVisible: !this.state.formVisible
        })
    }

    componentDidMount(){
        this.props.fetchCards(this.props.list.id)
    }


    renderCards(){
        return this.props.cards.map( (card) => {
            if( card.list_id === this.state.id){
                return (
                    <CardItem 
                        card={card}
                        key={`card_${this.state.id}_${card.id}`}
                    />
                )
            }
        })
    }

    render(){
        const { list } = this.props
        return (
            <li className={"list-index-item"} >
                <form onSubmit={this.handleSubmit}>
                    <input 
                        id={`list-title-input_${list.id}`}
                        type="text"
                        value={this.state.title}
                        onChange={this.update("title")}
                        onBlur={this.handleSubmit}
                    />
                </form>
                <ul className={"card-container"}>
                    {this.renderCards()}
                    {this.cardForm()}
                    <div style={{height: '0px', color: 'transparent', background: 'transparent', 'box-shadow': 'none'}} ref={ el => this.listIndexBottom = el}>
                    </div>
                </ul>
                {this.addCardForm()}
            </li>
        )
    }
}

export default connect(msp, mdp)(ListIndexItem);