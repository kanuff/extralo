import React from 'react';
import SignupFormContainer from './session_form/signup_form_container'
import LoginFormContainer from './session_form/login_form_container'
import { Route, Switch } from 'react-router-dom';
import Navbar from './navbar/navbar_container'; //have different navbars that render whether a user is logged in or not to the approrpiate logged in/logged out versions of the homepage
import UserNavbar from './user_navbar/user_navbar_container';
import Splashpage from './splashpage/splashpage_container'
import { AuthRoute, ProtectedRoute, AltRoute } from '../util/route_util';
import Modal from './modal';
import BoardIndex from './board_index/board_index_container'
import BoardShow from './board_show/board_show_container';

const App = () => (
  <div>
    <Modal />
    <header>
      <AltRoute path="/" loggedIn_component={UserNavbar} loggedOut_component={Navbar} />
    </header>
    <Switch>
      <AuthRoute path="/signup" component={SignupFormContainer} />
      <AuthRoute path="/login" component={LoginFormContainer} />
      <AltRoute path="/boards/:board_id" loggedIn_component={BoardShow}  loggedOut_component={Splashpage} />
      <AltRoute exact path="/" loggedIn_component={BoardIndex}  loggedOut_component={Splashpage} />
    </Switch>
  </div>
)

export default App;