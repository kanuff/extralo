import React from 'react';
import SignupFormContainer from './session_form/signup_form_container'
import LoginFormContainer from './session_form/login_form_container'
import { Route } from 'react-router-dom';
import Navbar from './navbar/navbar_container'

const App = () => (
  <div>
    <header>
      <h1>Extralo!</h1>
      <Navbar />
    </header>
    <Route path="/signup" component={SignupFormContainer} />
    <Route path="/login" component={LoginFormContainer} />
  </div>
)

export default App;