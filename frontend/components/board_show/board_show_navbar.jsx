import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';


const mdp = dispatch => {
  return {
    openModal: modal => dispatch(openModal(modal)),
  }
}


class BoardShowNavbar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: props.board.title,
      id: props.board.id,
    }
    this.destroyBoard = this.destroyBoard.bind(this);
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.openModal = this.openModal.bind(this);
  }

  openModal(modal){
    return () => {
      this.props.openModal(modal)
    }
  }

  handleSubmit(e){
    e.preventDefault();
    document.getElementById("board-title-input").blur();
    this.props.updateBoard(this.state);
  }
  
  update(field){
    return (e) => {
      this.setState(
        {[field]: e.target.value}
      )
    }
  }

  componentDidUpdate(prevProps){
    if (prevProps !== this.props){
      this.setState(
        {title: this.props.board.title, id: this.props.board.id}
      )
    }
  }

  componentWillUnmount(){
    this.props.clearErrors();
    this.props.updateBoard(this.state)
  }

  destroyBoard(){
    if (this.props.current_user_id === this.props.board.creator_id){
      this.props.destroyBoard(this.props.board.id)
                .then( () => this.props.history.push("/"))
    } else {
      this.props.receiveErrors({ responseJSON: ['Only the board owner and admins may delete this board']})
    }
  }

  processErrors() {
    return this.props.errors.map((error, idx) => {
      return (
        <li key={`error_${idx}`}>
          {error}
        </li>
      )
    })
  }

  render (){
    return (
      <>
        <section className={"board-show-navbar-container"}>
          <section className={"float-left"} >
            <form id={'board-title'} onSubmit={this.handleSubmit}>
              <input
                id={'board-title-input'}
                type="text" 
                onChange={this.update("title")} 
                onBlur={this.handleSubmit}
                value={this.state.title}/>
            </form>
            <button id={'board-favorited'}><i className="far fa-star"></i></button>
            <button id={'member-icon'}>M</button>
            <button 
              id={'board-invite-btn'}
              onClick={this.openModal('invite-members')}
              >Invite
              </button>
          </section>
          <section className={"float-right"} >
            <button 
              id={'board-show-menu-btn'}
              onClick={this.destroyBoard}
              > 
              Delete Board
            </button>
          </section>
        </section>
        <ul className={"errors"}>
          {this.processErrors()}
        </ul>
      </>
    )
  }
}

export default connect(null, mdp)(BoardShowNavbar);