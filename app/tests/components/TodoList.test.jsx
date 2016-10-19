const expect           = require('expect');
const React            = require('react');
const ReactDOM         = require('react-dom');
const TestUtils        = require('react-addons-test-utils');
const Todo             = require('Todo');
const TodoList         = require('TodoList');
const $                = require('jquery');

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
      text: 'Do something'
    }, {
      id: 2,
      text: 'Check mail'
    }];

    const todoList = TestUtils
        .renderIntoDocument(<TodoList todos={todos}/>);

    const todosComponents = TestUtils
        .scryRenderedComponentsWithType(todoList, Todo);

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
