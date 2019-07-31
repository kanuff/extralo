import React from 'react'
import { Link } from 'react-router-dom';


export default class Navbar extends React.Component{
  constructor(props){
    super(props)
  }


  render(){
    if(this.props.currentUser){
      return (
        <section className={"navbar"}>
          <div className={"float-left"}>
            <h1>Extralo!</h1>
          </div>
          <div className={"float-right"}>
            Hello, {this.props.currentUser.email}
            <button onClick={this.props.logout}>Logout</button>
          </div>
        </section>

      )

    } else {
      return (
        <section className={"navbar"}>
          <div className={"float-left"}>
            <h1>Extralo!</h1>
          </div>
          <div className={"float-right"}>
            <Link className={'login-form-button'} to={"/login"}>Log In</Link>
            <Link className={'signup-form-button'} to={"/signup"}>Sign Up</Link>
          </ div>
        </section>
      )
    }

    // return(
      
    //   //Should contain the logo and (Login + Signup buttons) or a greeting depending on whether the user is logged in
    // )
  }

}