import React from 'react';
import ReactDOM from 'react-dom'
import { configureStore } from './store/store'
import Root from './components/root'
// import * as SessionAPIUtil from './util/session_api_util'
// eventually import store
// eventually import RootReducer

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();

  // TESTING ONLY
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // TESTING ONLY

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root)
})