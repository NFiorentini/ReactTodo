const expect           = require('expect');
const {Provider}       = require('react-redux');
const React            = require('react');
const ReactDOM         = require('react-dom');
const TestUtils        = require('react-addons-test-utils');
const $                = require('jquery');

import {configure} from 'configureStore';
import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodo, {Todo} from 'Todo';

describe('TodoList', () => {

  it('should exist', () => {
    expect(TodoList).toExist();
  });

  /*
  Asserts that we have the same number of Todos as
  Todo components.
  */
  it('should render one Todo component for each todo item',
      () => {

    /*
    Dummy data.
    */
    const todos = [{
      id: 1,
      text: 'Do something',
      completed: false,
      completedAt: undefined,
      createdAt: 500
    }, {
      id: 2,
      text: 'Check mail',
      completed: false,
      completedAt: undefined,
      createdAt: 500
    }];

    const store = configure({
      todos
    });

    const provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedTodoList/>
      </Provider>
    );

    const todoList = TestUtils
        .scryRenderedComponentsWithType(
            provider, ConnectedTodoList)[0];

    const todosComponents = TestUtils
        .scryRenderedComponentsWithType(
            todoList, ConnectedTodo);

    /*
    Make the assertion.
    */
    expect(todosComponents.length).toBe(todos.length);
  });

  it('should render empty message if no todos', () => {
    const todos = [];

    const todoList = TestUtils
        .renderIntoDocument(<TodoList todos={todos}/>);

    const $el = $(ReactDOM.findDOMNode(todoList));

    expect($el.find('.container__message').length).toBe(1);
  });
});
