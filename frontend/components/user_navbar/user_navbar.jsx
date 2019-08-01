import React from 'react';
import { Link } from 'react-router-dom';
import UserOptionsMenu from './user_options_menu'


export default class UserNavbar extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillUnmount(){
    this.props.closeModal();
  }

  showForm(field){
    return () => this.props.openModal(field)
  }

  hideForm(){
    this.setState(
      { "form-visible": false }
    )
  }

  render(){
    return(
      <section className={"user-navbar"}>
        <div className={"float-left"}>
          <Link to="/" className={"home-btn"}><i className="fas fa-home"></i></Link>
          <button className={"boards-btn"}><i className="fas fa-list"></i>  Boards</button>
          <input /*onBlur={implemement once building the container and internal state with handler helper methods}*/className={"searchbar"} type="text"/>
        </div>
        <div className={"float-middle"}>
          <Link to="/" className={"logo"}>Extralo</Link>
        </div>
        <div className={"float-right"}>
          <button onClick={this.showForm("create-board-options")} className={"create-board-btn"}><i className="fas fa-plus"></i></button>
          <button onClick={this.showForm("information")} className={"information-btn"}><i className="fas fa-info-circle"></i></button>
          <button onClick={this.showForm("notifications")} className={"notification-btn"}><i className="far fa-bell"></i></button>
          <button onClick={this.showForm("user-options")} id={"user-options-btn"}>M</button>
        </div>
      </section>
    )
  }
}