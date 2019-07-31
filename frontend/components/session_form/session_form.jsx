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


  processErrors() {
    return this.props.errors.session.map((error, idx) => {
      return (
        <li key={`error_${idx}`}>
          {error}
        </li>
      )
    })
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
        <section className={"user-form"}>
          <ul className={"errors"}>
            {this.processErrors()}
          </ul>
          <h1 className={"form-title"}>{this.props.welcomeMessage}</h1>
          <Link to={this.props.otherForm}>{this.props.otherFormButtonText}</Link>
          <form id={this.props.formType} onSubmit={this.handleSubmit}>

            <label>Email</label>
              <input type="text" value={this.state.email} onChange={this.update("email")}/>

            <label>Password</label>
              <input type="password" value={this.state.password} onChange={this.update("password")}/>

            <input type="submit" value={this.props.submitText}/>

          </form>
        </section>
      </>
    )
  }



}