const actions = require('actions');
const {hashHistory} = require('react-router');
const {Provider} = require('react-redux');
const React = require('react');
const ReactDOM = require('react-dom');
const store = require('configureStore').configure();

import firebase from 'app/firebase/';
import router from 'app/router/';


firebase.auth().onAuthStateChanged((user) => {

  if (user) {
    store.dispatch(actions.login(user.uid));
    hashHistory.push('/todos');
  } else {
    store.dispatch(actions.logout());
    hashHistory.push('/');
  }
});

store.dispatch(actions.startAddTodos());

// Load Foundation
$(document).foundation();

// App CSS
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
