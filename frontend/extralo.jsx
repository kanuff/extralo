import React from 'react';
import ReactDOM from 'react-dom'
import { configureStore } from './store/store'
import Root from './components/root'
// import * as SessionAPIUtil from './util/session_api_util'
// eventually import store
// eventually import RootReducer

document.addEventListener('DOMContentLoaded', () => {

  let store;
  if (window.currentUser){
    const preloadedState = {
      entities: {
        users: {[window.currentUser.id]: window.currentUser}
      },
      session: {id: window.currentUser.id}
    }
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // TESTING ONLY
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // TESTING ONLY

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root)
})