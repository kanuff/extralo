import React from 'react';
import { Link } from 'react-router-dom';




export default class UserNavbar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      "user-options": false,
    }

  }


  //on component did mount,fetch all the boards that belong to the logged in user

  toggleShow(field){
    return (e) => {
      this.setState({[field]: !this.state[field]})
      console.log(this.state[field])
    }
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
          <button className={"create-board-btn"}><i className="fas fa-plus"></i></button>
          <button className={"information-btn"}><i className="fas fa-info-circle"></i></button>
          <button className={"notification-btn"}><i className="far fa-bell"></i></button>
          <button onClick={this.toggleShow("user-options")} id={"user-options-btn"}>M</button>
          <section className={"user-options"} className={"dropdown-menu"}>
            <ul className={"dropdown-items"}>
              <li /*onClick={this.props.logout}*/ className={"dropdown-item"} id={"logout-btn"}>            
                Logout
              </li>
            </ul>
          </section>
        </div>
      </section>
    )
  }
}