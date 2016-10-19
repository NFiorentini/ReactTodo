const React          = require('react');
const Todo           = require('Todo');

/*
The TodoList component is responsible for rendering
a Todo component every element in the todos array.
*/
const TodoList = React.createClass({

  render: function () {
    const {todos} = this.props;

    const renderTodos = () => {

      if (todos.length === 0) {
        return (
          <p className="container__message">
            Nothing To Do
          </p>
        );
      }

      /*
      todos.map() takes a function & calls that function
      for every element in the array. Whatever is returned
      replaces that element in the array.
      */
      return todos.map((todo) => {
        return (

          /*
          {...todo} uses the spread operator & lets us
          pass down attributes as props to a React
          component without explicitly defining
          everything. In this case id & text are
          passed.
          */
          <Todo key={todo.id} {...todo}
              onToggle={this.props.onToggle}/>
        );
      });
    };

    return (
      <div>
        {renderTodos()}
      </div>
    )
  }
});

module.exports = TodoList;
