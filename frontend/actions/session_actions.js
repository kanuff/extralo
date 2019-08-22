import * as SessionAPIUtil from '../util/session_api_util'

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER"
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER"
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS"
export const RECEIVE_ERRORS = "RECEIVE_ERRORS"
export const RECEIVE_USERS = "RECEIVE_USERS";
export const CLEAR_USERS = "CLEAR_USERS";

export const receiveCurrentUser = (user) => {
  return{
    type: RECEIVE_CURRENT_USER,
    user
  }
}

export const clearUsers = () => {
  return {
    type: CLEAR_USERS,
  }
}

export const fetchUsers = name => dispatch => {
  return SessionAPIUtil.fetchUsers(name)
                       .then( users => dispatch(receiveUsers(users)))
}


export const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export const logoutCurrentUser = () => {
  return{
    type: LOGOUT_CURRENT_USER
  }
}

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_ERRORS,
    errors
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_SESSION_ERRORS,
  }
}

export const login = (user) => dispatch => {
  return SessionAPIUtil.login(user)
                       .then( user => dispatch(receiveCurrentUser(user)),
                              errors => dispatch(receiveErrors(errors))
                       )
}

export const demoLogin = () => dispatch => {
  const demoUser = {
    email: "hunter12@gmail.com",
    password: "hunter12"
  }
  return SessionAPIUtil.login(demoUser)
    .then(user => dispatch(receiveCurrentUser(user)),
      errors => dispatch(receiveErrors(errors))
    )
}

export const signup = (user) => dispatch => {
  return SessionAPIUtil.signup(user)
                       .then( user => dispatch(receiveCurrentUser(user)),
                              errors => dispatch(receiveErrors(errors))
                       )
}

export const logout = () => dispatch => {
  return SessionAPIUtil.logout()
                       .then( () => dispatch(logoutCurrentUser()),
                              errors => dispatch(receiveErrors(errors))
                       )
}