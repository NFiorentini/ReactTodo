const AddTodo                       = require('AddTodo');
const moment                        = require('moment');
const React                         = require('react');
const TodoAPI                       = require('TodoAPI');
const TodoList                      = require('TodoList');
const TodoSearch                    = require('TodoSearch');
const uuid                          = require('node-uuid');

const TodoApp = React.createClass({

  getInitialState: function () {
    return {
      showCompleted: false,
      searchText: '',
      todos: TodoAPI.getTodos()
    };
  },

  componentDidUpdate: function () {
    TodoAPI.setTodos(this.state.todos);
  },

  handleAddTodo: function (text) {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: uuid(),
          text: text,
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        }
      ]
    });
  },

  handleToggle: function (id) {
    const updatedTodos = this.state.todos.map((todo) => {

      if (todo.id === id) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? moment().unix() : undefined;
      }

      return todo;
    });

    this.setState({todos: updatedTodos});
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
          "column small-centered small-11 medium-6 large-5">

            <div className="container">
              <TodoSearch onSearch={this.handleSearch}/>
              <TodoList todos={filteredTodos} onToggle={this.handleToggle}/>

              <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
          </div>

        </div>
      </div>
    )
  }
});

module.exports = TodoApp;