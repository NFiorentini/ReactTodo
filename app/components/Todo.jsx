const actions         = require('actions');
const {connect}       = require('react-redux');
const moment          = require('moment');
const React           = require('react');

export const Todo = React.createClass({

  render: function () {
    const {
      id,
      text,
      completed,
      createdAt,
      completedAt,
      dispatch
    } = this.props;

    const todoClassName =
        completed ? 'todo todo-completed' : 'todo';

    const renderDate = () => {
      let message = 'Created ';
      let timestamp = createdAt;

      if(completed) {
        message = 'Completed ';
        timestamp = completedAt;
      }

      return message + moment.unix(timestamp)
          .format('MMM Do YYYY @ h:mm a');
    };

    /*
    onClick() also could've been defined as its own
    function up above.
    */
    return (
      <div className={todoClassName}
          onClick={() => {
            dispatch(actions.startToggleTodo(
                id, !completed));
      }}>

        <div>
          <input type="checkbox" checked={completed}/>
        </div>

        <div>
          <p>{text}</p>
          <p className="todo__subtext">{renderDate()}</p>
        </div>
      </div>
    )
  }
});

export default connect()(Todo);
