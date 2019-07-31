import React from 'react';
import SignupFormContainer from './session_form/signup_form_container'
import LoginFormContainer from './session_form/login_form_container'
import { Route, Switch } from 'react-router-dom';
import Navbar from './navbar/navbar_container'

const App = () => (
  <div>
    <header>
    <Switch>
      <Route path="/" component={Navbar}/>
      <Route path="/signup" /> 
      <Route path="/login" />
    </Switch>
    </header>
    <Switch>
      <Route path="/signup" component={SignupFormContainer} />
      <Route path="/login" component={LoginFormContainer} />
    </Switch>
  </div>
)

export default App;