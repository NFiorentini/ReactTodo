const expect          = require('expect');
const TodoAPI         = require('TodoAPI');

describe('TodoAPI', () => {

  /*
  beforeEach() & afterEach() are Mocha methods.
  beforeEach is called before every test. Here, it
  cleans out the local storage value.
  */
  beforeEach(() => {
    localStorage.removeItem('todos');
  });

  it('should exist', () => {
    expect(TodoAPI).toExist();
  });



  describe('filterTodos', () => {

    const todos = [{
      id: 1,
      text: 'Win Heisman trophy',
      completed: true
    },{
      id: 2,
      text: 'Pick up Nobel Prize from committee ' +
          'receptionist',

      completed: false
    },{
      id: 3,
      text: 'Win another Grammy!',
      completed: true
    }];

    it(('should return all items if showCompleted ' +
        'is true'), () => {

      const filteredTodos = TodoAPI
          .filterTodos(todos, true, '');

      expect(filteredTodos.length).toBe(3);
    });

    it(('should return non-completed todos when ' +
        'showCompleted is false'), () => {

      const filteredTodos = TodoAPI
          .filterTodos(todos, false, '');

      expect(filteredTodos.length).toBe(1);
    });

    it('should sort by completed status', () => {

      const filteredTodos = TodoAPI
          .filterTodos(todos, true, '');

      expect(filteredTodos[0].completed).toBe(false);
    });

    it('should filter todos by searchText', () => {

      const filteredTodos = TodoAPI
          .filterTodos(todos, true, 'win');

      expect(filteredTodos.length).toBe(2);
    });

    it('should return all todos if searchText is empty',
        () => {

      const filteredTodos = TodoAPI
          .filterTodos(todos, true, '');

      expect(filteredTodos.length).toBe(3);
    });
  });
});
