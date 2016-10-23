const actions       = require('actions');
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

 store.dispatch(actions.addTodo('Clean the yard'));
 store.dispatch(actions.setSearchText('yard'));
 store.dispatch(actions.toggleShowCompleted());

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('app')
);
