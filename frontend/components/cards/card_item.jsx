import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain } from '@fortawesome/free-solid-svg-icons'

export default class CardItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: props.card.title,
      description: props.card.description,
      id: props.card.id
    }
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openCardShowModal = this.openCardShowModal.bind(this);
  }

  openCardShowModal(){
    this.props.history.push(`/boards/${this.props.board_id}/cards/${this.state.id}`)
    this.props.openModal("card-show")
  }

  handleSubmit(e) {
    e.preventDefault()
    document.getElementById(`card-title-input_${this.props.card.id}`).blur();
    this.props.updateCard(this.state)
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value,
      })
    }
  }

  getListStyle(isDragging, draggableStyle) {
    return {
      // background: 'rgba(255, 255, 255, 0.9)',
      // boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.25)',
      ...draggableStyle
    }
  }

  render(){
    return (
      <Draggable
        draggableId={this.props.card.id}
        key={this.props.card.id}
        index={this.props.index}
        type={'CARD'}
      >
        {(provided, snapshot) => (
          <li 
            className = {"card-item"}
            // onClick={this.openCardShowModal}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={this.getListStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <div
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <FontAwesomeIcon
                icon={faBrain}
                  style={{
                  fontSize: '50px',
                  backgroundColor: 'transparent',
                  display: 'block',
                  margin: 'auto',
                }}
                onClick={(e) => {
                  e.preventDefault()
                  window.open(this.props.card.title, '_blank')
                }}
              />
              <div
                style={{
                  fontSize: '14px',
                  backgroundColor: 'transparent',
                  color: 'white',
                  textAlign: 'center',
                  width: '200px',
                  wordBreak: 'break-all'
                }}
              >
                {this.props.card.title}
              </div>
            </div>
          </li>
        )}
      </Draggable>

    )
  }
}
