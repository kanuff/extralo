import React from 'react';
import { connect } from 'react-redux';
import { 
    updateList,
    deleteList,
 } from '../../actions/list_actions';
import { 
    fetchCards,
    createCard,
 } from '../../actions/card_actions';
import CardItem from '../cards/card_item_container';
import { openModal, closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd'

const msp = (state, ownProps) => {
    return {
        cards: Object.values(state.entities.cards),
        history: ownProps.history,
    }
}

const mdp = dispatch => {
    return {
        updateList: list => dispatch(updateList(list)),
        fetchCards: list_id => dispatch(fetchCards(list_id)),
        createCard: card => dispatch(createCard(card)),
        openModal: modal => dispatch(openModal(modal)),
        closeModal: () => dispatch(closeModal()),
        deleteList: id => dispatch(deleteList(id)),
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
        this.archiveList = this.archiveList.bind(this);
    }

    archiveList(){
        this.props.deleteList(this.state.id);
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

    formToggle() {
        this.listIndexBottom.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        this.setState({
            formVisible: !this.state.formVisible
        })
    }
    
    handleCardSubmit(e){
        this.listIndexBottom.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
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
                <form  className={"create-card-form"} onSubmit={this.handleCardSubmit}>
                    <input
                        type="text"
                        placeholder={"Enter a title for this card..."}
                        onChange={this.update("cardTitle")}
                    />
                    <div ref={el => this.listIndexBottom = el}>
                        <input 
                            type="submit" 
                            value={"Add Card"}
                        />
                        <button  onClick={this.formToggle}> x </button>
                    </div>
                </form>
            ) 
        } else {
            return (
                <div
                    style={{
                        position: 'relative',
                        height: '30px',
                        padding: '0px',
                        color: 'transparent',
                        background: 'transparent',
                        'boxShadow': 'none',
                    }}
                    ref={el => this.listIndexBottom = el}>
                </div>
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

    componentDidMount(){
        this.props.fetchCards(this.props.list.id)
    }

    renderCards(){
        return this.props.cards.map( (card) => {
            if( card.list_id === this.state.id){
                if (!card.archived){
                    return (
                        <CardItem 
                            card={card}
                            key={`card_${this.state.id}_${card.id}`}
                            openModal={this.props.openModal}
                            history={this.props.history}
                            board_id={this.props.board_id}
                        />
                    )
                }
            }
        })
    }

    render(){
        const { list } = this.props
        return (
            <Draggable 
                draggableId={this.props.list.id}
                key={this.props.list.id} 
                index={this.props.index}>
                {(provided, snapshot) => (
                    <li 
                        className={"list-index-item"}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <form onSubmit={this.handleSubmit}>
                            <input 
                                id={`list-title-input_${list.id}`}
                                type="text"
                                value={this.state.title}
                                onChange={this.update("title")}
                                onBlur={this.handleSubmit}
                            />
                        </form>
                        <button 
                            id={'archive-list-btn'}
                            onClick={this.archiveList}>
                            Archive List
                        </button>
                        <ul className={"card-container"}>
                            {this.renderCards()}
                            {this.cardForm()}
                        </ul>
                        {this.addCardForm()}
                    </li>
                )}
            </Draggable>
        )
    }
}

export default withRouter(connect(msp, mdp)(ListIndexItem));