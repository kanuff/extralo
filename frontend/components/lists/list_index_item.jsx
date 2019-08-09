import React from 'react';
import { connect } from 'react-redux';
import { 
    updateList,
    deleteList,
 } from '../../actions/list_actions';
import { 
    fetchCards,
    createCard,
    updateCard,
 } from '../../actions/card_actions';
import CardItem from '../cards/card_item_container';
import { openModal, closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import { Draggable, Droppable } from 'react-beautiful-dnd'

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
        updateCard: card => dispatch(updateCard(card)),
    }
}


class ListIndexItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: props.list.title,
            id: props.list.id,
            formVisible: false,
            cardTitle: "",
            cardOrder: [],
            result: {},
        }
        this.cardIds = props.list.card_ids
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formToggle = this.formToggle.bind(this);
        this.handleCardSubmit = this.handleCardSubmit.bind(this);
        this.archiveList = this.archiveList.bind(this);
        this.generateCardOrder = this.generateCardOrder.bind(this);
    }

    resultsEqual(result, oldResult){
        let equal = true;
        for (const prop in result){
            if (result[prop] !== oldResult[prop]){
                equal = false
            }
        }
        return equal;
    }

    
    rearrangeAndUpdate(result, card) {
        //right now this is only configured to handle a move from the same list
        const { cardOrder } = this.state
        const { destination, source, draggableId } = result;
        cardOrder.splice(source.index, 1)
        cardOrder.splice(destination.index, 0, draggableId)

        this.setState({
            cardOrder: cardOrder,
            result: result,
        })
        card.next_id = cardOrder[destination.index + 1] || 'sentinel'
        card.prev_id = cardOrder[destination.index - 1] || 'sentinel'
        card.order_change = true;
        this.props.updateCard(card)
    }

    updateCardAcrossList(card, result, cardOrder){
        const {destination } = result
        card.next_id = cardOrder[destination.index + 1] || 'sentinel'
        card.prev_id = cardOrder[destination.index - 1] || 'sentinel'
        card.order_change = true;
        this.props.updateCard(card)
    }

    rearrange(result, action) {
        //right now this is only configured to handle a move from the same list
        const { cardOrder } = this.state
        const { destination, source, draggableId } = result;
        
        if ( action === "destination"){
            cardOrder.splice(destination.index, 0, draggableId)
        } else if (action === "source"){
            cardOrder.splice(source.index, 1)
        }
        this.setState({
            cardOrder: cardOrder,
            result: result,
        })
        if ( action === "destination"){
            return cardOrder
        }
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            const { cardOrder } = this.state;
            const oldcardOrder = Object.assign([], prevState.cardOrder) || []
            if (oldcardOrder.length !== this.props.length) {
                this.generateCardOrder();
            } else if (cardOrder.length === 0) {
                this.generateCardOrder();
            }

            const list_id = this.state.id;
            const { result } = this.props;
            const oldResult = Object.assign({}, prevState.result)
            if ( result ){
                const { destination, source, draggableId } = result;
                if ( destination ){
                    const card = this.props.cards.find(card => card.id === draggableId)
                    if ( `list_${list_id}` === destination.droppableId &&
                         `list_${list_id}` === source.droppableId){
                        if (!this.resultsEqual(result, oldResult)){
                            this.rearrangeAndUpdate(result, card)
                        }
                    } else if (destination.droppableId !== source.droppableId){
                        if ( `list_${list_id}` === destination.droppableId){
                            if (!this.resultsEqual(result, oldResult)) {
                                card.list_id = list_id;
                                const destinationCardOrder = this.rearrange(result, "destination")
                                this.updateCardAcrossList(card, result, destinationCardOrder)
                            }
                        } else if (`list_${list_id}` === source.droppableId){
                            if (!this.resultsEqual(result, oldResult)) {
                                this.rearrange(result, "source") 
                            }
                        }  
                    }
                }
            }
        }
    }


    generateCardOrder(){
        let { cards } = this.props;
        cards = cards.filter( card => card.list_id === this.state.id)
        if (cards.length > 0) {
            const cardOrder = [];
            let current_card = cards.find(card => card.prev_id === null && card.archived === false)
            if (current_card) {
                cardOrder.push(current_card.id)
                while (current_card.next_id !== null) {
                    current_card = cards.find(card => current_card.next_id === card.id)
                    if ( !current_card ){
                        break
                    }
                    cardOrder.push(current_card.id)
                }
                this.setState({
                    cardOrder: cardOrder
                })
            }
        }

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
        if (card.title ){
            this.props.createCard(card)
                     .then( () => {
                         this.setState({cardTitle: ""});
                         e.target.reset();
                        })
        }
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
                <form  className={"create-card-form"} id={"create-card-form-background"} onSubmit={this.handleCardSubmit}>
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
                        height: '50px',
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
        const { cards } = this.props;
        if ( cards.length > 0){
            const { cardOrder } = this.state;
            return cardOrder.map((card_id, idx) => {
                const card = cards.find(card => card.id === card_id)
                if (card.list_id === this.state.id) {
                    if (!card.archived) {
                        return (
                            <CardItem
                                card={card}
                                key={`card_${card.id}`}
                                openModal={this.props.openModal}
                                history={this.props.history}
                                board_id={this.props.board_id}
                                index={idx}
                            />
                        )
                    }
                }
            })
        }
    }

    getListStyle(isDragging, draggableStyle) {
        return {
            background: 'rgb(205, 229, 255)',
            boxShadow: isDragging ? '5px 5px 2px 2px rgba(0, 0, 0, 0.25)' : '1px 1px 0px 0px rgba(0, 0, 0, 0.25)',
            ...draggableStyle
        }
    }

    render(){
        const { list } = this.props
        return (
            <Draggable 
                draggableId={this.props.list.id}
                key={this.props.list.id} 
                index={this.props.index}
                >
                {(provided, snapshot) => (
                    <li 
                        className={"list-index-item"}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        style={this.getListStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                            )}
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
                        <Droppable
                            droppableId={`list_${this.props.list.id}`}
                            type={'CARD'}
                        >
                            {(provided) => (
                                <ul 
                                    className={"card-container"}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {this.renderCards()}
                                    {provided.placeholder}
                                    {this.cardForm()}
                                </ul>
                            )}
                        </Droppable>
                        {this.addCardForm()}
                    </li>
                )}
            </Draggable>
        )
    }
}

export default withRouter(connect(msp, mdp)(ListIndexItem));