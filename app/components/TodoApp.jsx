const moment                        = require('moment');
const React                         = require('react');
const TodoAPI                       = require('TodoAPI');
const uuid                          = require('node-uuid');

import AddTodo from "AddTodo";
import TodoList from 'TodoList'
import TodoSearch from 'TodoSearch';

const TodoApp = React.createClass({

  getInitialState: function () {

    return {
      showCompleted: false,
      searchText: '',

      /*
      When we start, fetch the todos.
      */
      todos: TodoAPI.getTodos()
    };
  },

  /*
  When we make changes to the state, set
  the todos.
  */
  componentDidUpdate: function () {
    TodoAPI.setTodos(this.state.todos);
  },

  handleAddTodo: function (text) {

    this.setState({

      /*
      Spread out the current todos array & push the
      new todo item onto the end.
      */
      todos: [
        ...this.state.todos,
        {

          /*
          uuid() returns a long, unique string that
          is seeded using the timestamp.
          */
          id: uuid(),
          text: text,
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        }
      ]
    });
  },

  handleSearch: function (showCompleted, searchText) {

    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    });
  },

  render: function () {
    const {todos, showCompleted, searchText} = this.state;

    const filteredTodos = TodoAPI.filterTodos(todos,
        showCompleted, searchText);

    return (
      <div>
        <h1 className="page-title">Todo App</h1>

        <div className="row">
          <div className=
          "column small-centered small-11 medium-6 large-5"
          >

            <div className="container">
              <TodoSearch onSearch={this.handleSearch}/>

              <TodoList/>

              <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
          </div>

        </div>
      </div>
    )
  }
});

module.exports = TodoApp;
