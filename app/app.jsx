const actions       = require('actions');
const {Provider}    = require('react-redux');
const React         = require('react');
const ReactDOM      = require('react-dom');
const store         = require('configureStore').configure();
const TodoApp       = require('TodoApp');

const {
  Route,
  Router,
  IndexRoute,
  hashHistory
 }                  = require('react-router');

 store.subscribe(() => {
   console.log('New state', store.getState());
 });
 
// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <TodoApp/>
  </Provider>,
  document.getElementById('app')
);
