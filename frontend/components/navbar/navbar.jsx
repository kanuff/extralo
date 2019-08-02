import React from 'react'
import { Link } from 'react-router-dom';


export default class Navbar extends React.Component{
  render(){
    if(this.props.currentUser){
      return (
        <section className={"navbar"}>
          <div className={"float-left"}>
            <h1>Extralo</h1>
          </div>
          <div className={"float-right"}>
            Hello, {this.props.currentUser.name}
            <button onClick={this.props.logout}>Logout</button>
          </div>
        </section>
      )

    } else {
      return (
        <section className={"navbar"}>
          <div className={"float-left"}>
            <Link to={"/"}><h1>Extralo</h1></Link>
          </div>
          <div className={"float-right"}>
            <button id={'demo-btn'} onClick={this.props.demoLogin}>Demo!</button>
            <Link className={'login-form-button'} to={"/login"}>Log In</Link>
            <Link className={'signup-form-button'} to={"/signup"}>Sign Up</Link>
          </ div>
        </section>
      )
    }
  }

}