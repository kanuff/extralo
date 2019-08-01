import React from 'react';
import { Link } from 'react-router-dom';

export default class UserNavbar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      searchbar: "",
    }
    this.clearSearch = this.clearSearch.bind(this)
    this.update = this.update.bind(this)
  }

  componentDidMount(){
    this.props.closeModal();
  }

  componentWillUnmount(){
    this.props.closeModal();
  }

  showForm(field){
    if(this.props.modal===field){
      return () => {
        this.props.closeModal();
      }
    }
    return () => this.props.openModal(field)
  }

  clearSearch(){
    this.setState(
      { searchbar: ""}
      )
  }

  update(field){
    return e => {
      e.preventDefault();
      this.setState(
        {[field]: e.target.value}
      )
    }
  }

  render(){
    return(
      <section className={"user-navbar"}>
        <div className={"float-left"}>
          <Link to="/" className={"home-btn"}><i className="fas fa-home"></i></Link>
          <button className={"boards-btn"}><i className="fas fa-list"></i>  Boards</button>
          <input 
            value={this.state.searchbar} 
            onBlur={this.clearSearch} 
            onChange={this.update("searchbar")}
            onFocus={this.props.closeModal} 
            className={"searchbar"} 
            type="text"
          />
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