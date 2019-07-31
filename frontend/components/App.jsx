import React from 'react';
import SignupFormContainer from './session_form/signup_form_container'
import LoginFormContainer from './session_form/login_form_container'
import { Route, Switch } from 'react-router-dom';
import Navbar from './navbar/navbar_container'; //have different navbars that render whether a user is logged in or not to the approrpiate logged in/logged out versions of the homepage
import Splashpage from './splashpage/splashpage_container'
import { AuthRoute } from '../util/route_util';

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
      <AuthRoute path="/signup" component={SignupFormContainer} />
      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/" component={Splashpage} />
    </Switch>
  </div>
)

export default App;