const actions       = require('actions');
const {Provider}    = require('react-redux');
const React         = require('react');
const ReactDOM      = require('react-dom');
const store         = require('configureStore').configure();
const TodoApp       = require('TodoApp');
const TodoAPI       = require('TodoAPI');

const {
  Route,
  Router,
  IndexRoute,
  hashHistory
 }                  = require('react-router');


store.dispatch(actions.startAddTodos());

// Load Foundation
$(document).foundation();

// App CSS
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <TodoApp/>
  </Provider>,
  document.getElementById('app')
);
