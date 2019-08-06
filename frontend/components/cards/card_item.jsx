import React from 'react';


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


  render(){
    return (
      <li onClick={this.openCardShowModal}>
        {this.state.title}
      </li>
    )
  }
}
