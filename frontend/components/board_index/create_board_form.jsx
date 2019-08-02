import React from 'react';
import { connect } from 'react-redux';
import { createBoard } from '../../actions/board_actions';
import { closeModal } from '../../actions/modal_actions';

const mdp = dispatch => {
  return {
    createBoard: board => dispatch(createBoard(board)),
    closeModal: () => dispatch(closeModal()),
  }
}

class CreateBoardForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: "Add board title",
      team: "No team",
      private: true,
      background_img: "dummy/url/for/now.png"
    }
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearTitle = this.clearTitle.bind(this)
  }

  handleSubmit(e){
    e.preventDefault();
    if (this.state.title !== "Add board title"){
      this.props.createBoard(this.state)
        .then(() => this.props.closeModal())
    }
  }

  clearTitle() {
    this.setState(
      { title: "" }
    )
  }


  update(field){
    return (e) => {
      this.setState(
        {[field]: e.target.value}
      )
    }
  }

  render() {
    return (
      <form className={"create-board-form"} onSubmit={this.handleSubmit}>
        <input value={this.state.title} type="text" onFocus={this.clearTitle} onChange={this.update("title")}/>
        <input type="submit" value={"Create Board"}/>
      </form>
    )
  }
} 



export default connect(null, mdp)(CreateBoardForm)