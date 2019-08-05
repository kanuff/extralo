import React from 'react';
import { connect } from 'react-redux';
import { updateList } from '../../actions/list_actions';
import { fetchCards } from '../../actions/card_actions';
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
    }
}


class ListIndexItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: props.list.title,
            id: props.list.id,
        }
        this.cardIds = props.list.card_ids
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault()
        document.getElementById(`list-title-input_${this.props.list.id}`).blur();
        this.props.updateList(this.state)
    }

    update(field) {
        return (e) => {
            this.setState({
                [field]: e.target.value,
            })
        }
    }

    componentDidMount(){
        this.props.fetchCards(this.props.list.id)
    }


    renderCards(){
        return this.props.cards.map( (card, idx) => {
            if( card.list_id === this.state.id){
                return (
                    <CardItem 
                        card={card}
                        key={`card_${this.state.id}_${idx}`}
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
                </ul>
            </li>
        )
    }
}

export default connect(msp, mdp)(ListIndexItem);