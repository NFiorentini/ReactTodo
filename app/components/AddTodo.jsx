const actions                      = require('actions');
const {connect}                    = require('react-redux');
const  React                       = require('react');

export const AddTodo = React.createClass({

  handleSubmit: function (e) {
    e.preventDefault();

    const {dispatch} = this.props;
    const todoText = this.refs.todoText.value;

    if(todoText.length > 0) {
      this.refs.todoText.value = '';
      dispatch(actions.startAddTodo(todoText));
    } else {

      /*
      If the user clicks the Add Todo button &
      there isn't valid data, the cursor is put back
      in the input field automatically so that they
      can try again.
      */
      this.refs.todoText.focus();
    }
  },

  render: function () {
    return (
      <div className="container__footer">
        <form onSubmit={this.handleSubmit}>

          <input type="text" ref="todoText"
              placeholder="What do you need to do?"/>

          <button className="button expanded">
            Add Todo
          </button>

        </form>
      </div>
    );
  }
});

export default connect()(AddTodo);
