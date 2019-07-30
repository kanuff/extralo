import React from 'react';
import { Link, Redirect } from 'react-router-dom';


export default class SessionForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleSubmit(e){
    e.preventDefault();
    const user = Object.assign({}, this.state)
    this.props.formAction(this.state).then( () => {
      return this.setState(user)
    });
  }

  update(field){
    return (e) => {
      this.setState({[field]: e.target.value});
    }
  }

  render(){
    if(this.props.currentUser){
      return <Redirect to="/" />
    }
    return(
      <>
        <Link to={this.props.otherForm}>{this.props.otherFormButtonText}</Link>
        <form id={this.props.formType} onSubmit={this.handleSubmit}>
          <label>Email
            <input type="text" value={this.state.email} onChange={this.update("email")}/>
          </label>
          <label>Password
            <input type="password" value={this.state.password} onChange={this.update("password")}/>
          </label>
          <input type="submit" value={this.props.submitText}/>
        </form>
      </>
    )
  }



}