import * as SessionAPIUtil from '../util/session_api_util'

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER"
export const RECEIVE_ERRORS = "RECEIVE_ERRORS"
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER"

export const receiveCurrentUser = (user) => {
  return{
    type: RECEIVE_CURRENT_USER,
    user
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

export const login = (user) => dispatch => {
  return SessionAPIUtil.login(user)
                       .then( user => dispatch(receiveCurrentUser(user)),
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