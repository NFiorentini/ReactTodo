const $          = require('jquery');

module.exports = {

  setTodos: function (todos) {

    if($.isArray(todos)) {
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    }
  },

  getTodos: function () {

    /*
    Grab the todos from local storage.
    */
    const stringTodos = localStorage.getItem('todos');
    let todos = [];

    try {
      todos = JSON.parse(stringTodos);
    } catch (e) {
      console.log(e);
    }

    return $.isArray(todos) ? todos : [];
  },

  filterTodos: function (todos, showCompleted,
        searchText) {

    let filteredTodos = todos;

    /*
    Filter by showCompleted.
    */
    filteredTodos = filteredTodos.filter((todo) => {
      return !todo.completed || showCompleted;
    });

    /*
    Filter by searchText.
    */
    filteredTodos = filteredTodos.filter((todo) => {
      const text = todo.text.toLowerCase();

      return searchText.length === 0 ||
          text.indexOf(searchText) > -1;
    });

    /*
    Sort todos with non-completed first.
    */
    filteredTodos.sort((a, b) => {

      if(!a.completed && b.completed) {
        return -1;
      } else if(a.completed && !b.completed) {
        return 1;
      } else {
        return 0;
      }
    });

    return filteredTodos;
  }
};
