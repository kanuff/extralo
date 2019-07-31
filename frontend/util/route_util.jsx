import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect, Route } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => (
    <Route path={path} exact={exact} render={(props) => (
        loggedIn ? <Redirect to="/" /> : <Component {...props} />
    )} 
    />
);

const msp = state => {
    return { loggedIn: Boolean(state.session.id) };
};

export const AuthRoute = withRouter(connect(msp, null)(Auth));
