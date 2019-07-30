import React from 'react'
import { Link } from 'react-router-dom';


export default class Navbar extends React.Component{
  constructor(props){
    super(props)
  }


  render(){
    if(this.props.currentUser){
      return (
        <div id={"navbar"}>
          Hello, {this.props.currentUser.email}
          <button onClick={this.props.logout}>Logout</button>
        </div>

      )

    } else {
      return (
        <div id={"navbar"}>
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Sign Up</Link>
        </ div>
      )
    }

    // return(
      
    //   //Should contain the logo and (Login + Signup buttons) or a greeting depending on whether the user is logged in
    // )
  }

}