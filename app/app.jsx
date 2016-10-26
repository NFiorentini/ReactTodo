const actions       = require('actions');
const {Provider}    = require('react-redux');
const React         = require('react');
const ReactDOM      = require('react-dom');
const store         = require('configureStore').configure();

const {
  Route,
  Router,
  IndexRoute,
  hashHistory
 }                  = require('react-router');

import TodoApp from 'TodoApp';
import Login from 'Login';


store.dispatch(actions.startAddTodos());

// Load Foundation
$(document).foundation();

// App CSS
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/">
        <Route path="todos" component={TodoApp}/>
        <IndexRoute component={Login}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
