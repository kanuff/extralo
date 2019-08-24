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
      starred: props.board.starred,
    }
    this.destroyBoard = this.destroyBoard.bind(this);
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleStar = this.toggleStar.bind(this);
  }

  toggleStar(){
    const toggled = this.state.starred ? false : true
    this.setState(
      {starred: toggled}
    )
    this.props.updateBoard({
      id: this.state.id,
      starred: toggled,
    })
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
        {
          title: this.props.board.title,
          id: this.props.board.id,
          starred: this.props.board.starred
        }
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
        <li className={"board-errors"} key={`error_${idx}`}>
          {error}
        </li>
      )
    })
  }

  render (){
    const star = this.state.starred ? <i className="fas fa-star" style={{ color: "rgba(255, 255, 0, 0.8)" }}></i> : <i className="far fa-star"></i>
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
            <button
              onClick={this.toggleStar}
              id={'board-favorited'}>
                {star}
            </button>
            <button id={'member-icon'}>{this.props.ownerInitial}</button>
            <button 
              id={'board-invite-btn'}
              onClick={this.openModal('invite-members')}
              >Invite
              </button>
          </section>
          <section className={"float-right"} >
            <button 
              id={'board-show-menu-btn'}
              onClick={this.openModal('board-options-menu')}
              > 
              ...show menu
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