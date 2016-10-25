const {connect}      = require('react-redux');
const React          = require('react');
const TodoAPI        = require('TodoAPI');

import Todo from 'Todo';

/*
The TodoList component is responsible for rendering
a Todo component every element in the todos array.
*/
export const TodoList = React.createClass({

  render: function () {
    const {todos, showCompleted, searchText} = this.props;

    const renderTodos = () => {

      const filteredTodos = TodoAPI
          .filterTodos(todos, showCompleted, searchText);

      if(filteredTodos.length === 0) {
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
      return filteredTodos.map((todo) => {
        return (

          /*
          {...todo} uses the spread operator & lets us
          pass down attributes as props to a React
          component without explicitly defining
          everything. In this case id & text are
          passed.
          */
          <Todo key={todo.id} {...todo}/>
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

export default connect(
  (state) => {
    return state;
  }
)(TodoList);
