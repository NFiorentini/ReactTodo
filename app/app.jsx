const React                          = require('react');
const ReactDOM                       = require('react-dom');

const {Route, Router, IndexRoute, hashHistory} =
    require('react-router');

const TodoApp = require('TodoApp');

$(document).foundation();

require('style!css!sass!applicationStyles');

/*
Since Countdown is nested under Main, its route
is /Countdown.
*/
ReactDOM.render(
  <p>Todo App!!!</p>,
  document.getElementById('app')
);
