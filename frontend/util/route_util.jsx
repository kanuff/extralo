import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect, Route } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => (
    <Route path={path} exact={exact} render={(props) => (
        loggedIn ? <Redirect to="/" /> : <Component {...props} />
    )} 
    />
);

const Protected = ({ component: Component, path, loggedIn, exact }) => (
    <Route path={path} exact={exact} render={(props) => (
        loggedIn ? <Component {...props} /> : <Redirect to="/" />
    )}
    />
);

const Alt = ({ loggedIn_component: Component1, loggedOut_component: Component2, path, loggedIn, exact }) => (
    <Route path={path} exact={exact} render={(props) => (
        loggedIn ? <Component1 {...props} /> : <Component2 {...props} />
    )}
    />
);

const msp = state => {
    return { loggedIn: Boolean(state.session.id) };
};



export const AuthRoute = withRouter(connect(msp, null)(Auth));
export const ProtectedRoute = withRouter(connect(msp, null)(Protected));
export const AltRoute = withRouter(connect(msp, null)(Alt));
