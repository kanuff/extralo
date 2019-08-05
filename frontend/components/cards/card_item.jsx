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
      <li>
        {this.state.title}
      </li>
    )
  }
}
