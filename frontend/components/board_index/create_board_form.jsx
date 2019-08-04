import React from 'react';
import { connect } from 'react-redux';
import { createBoard } from '../../actions/board_actions';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

const mdp = dispatch => {
  return {
    createBoard: board => dispatch(createBoard(board)),
    closeModal: () => dispatch(closeModal()),
  }
}

const msp = (state, ownProps) => {
  return {
    history: ownProps.history,
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
    console.log(this.props)
    if (this.state.title !== "Add board title"){
      this.props.createBoard(this.state)
        // .then( board => this.props.history.push(`/boards/${board.id}`))
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

export default withRouter(connect(msp, mdp)(CreateBoardForm))