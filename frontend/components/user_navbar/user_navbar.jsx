import React from 'react';
import { Link } from 'react-router-dom';




export default class UserNavbar extends React.Component{
  constructor(props){
    super(props)
  }


  //on component did mount,fetch all the boards that belong to the logged in user


  render(){
    return(
      <section className={"user-navbar"}>
        <div className={"float-left"}>
          <Link to="/" className={"home-btn"}><i className="fas fa-home"></i></Link>
          <button className={"boards-btn"}>Boards</button>
          <input className={"searchbar"} type="text"/>
        </div>
        <div className={"float-middle"}>
          Extralo
        </div>
        <div className={"float-right"}>
          <button className={"create-board-btn"}><i class="fas fa-plus"></i></button>
          <button className={"information-btn"}><i class="fas fa-info-circle"></i></button>
          <button className={"notification-btn"}><i class="far fa-bell"></i></button>
          <button className={"user-options-btn"}>M</button>
        </div>
      </section>
    )
  }
}