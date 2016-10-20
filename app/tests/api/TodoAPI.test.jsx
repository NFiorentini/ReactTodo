const  expect          = require('expect');
const  TodoAPI         = require('TodoAPI');

describe('TodoAPI', () => {

  beforeEach(() => {
    localStorage.removeItem('todos');
  });

  it('should exist', () => {
    expect(TodoAPI).toExist();
  });

  describe('setTodos', () => {

    it('should set valid todos array', () => {
      const  todos = [{
        id: 23,
        test: 'test all files',
        completed: false
      }];
      TodoAPI.setTodos(todos);

      const  actualTodos = JSON
          .parse(localStorage.getItem('todos'));

      expect(actualTodos).toEqual(todos);
    });

    it('should not set invalid todos array', () => {
      const  badTodos = {a: 'b'};
      TodoAPI.setTodos(badTodos);

      expect(localStorage.getItem('todos')).toBe(null);
    });
  });

  describe('getTodos', () => {

    it(('should return empty array for bad ' +
        'localstorage data'), () => {

      const  actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual([]);
    });

    it(('should return todo if valid array '+
        'in localstorage'), () => {

      const  todos = [{
        id: 23,
        test: 'test all files',
        completed: false
      }];

      localStorage.setItem('todos', JSON.stringify(todos));
      const  actualTodos = TodoAPI.getTodos();

      expect(actualTodos).toEqual(todos);
    });
  });

  describe('filterTodos', () => {
    const  todos = [{
      id: 1,
      text: 'Some text here',
      completed: true
    },{
      id: 2,
      text: 'Other text here',
      completed: false
    },{
      id: 3,
      text: 'Some text here',
      completed: true
    }];

    it(('should return all items if showCompleted ' +
        'is true'), () => {

      const  filteredTodos = TodoAPI
          .filterTodos(todos, true, '');

      expect(filteredTodos.length).toBe(3);
    });

    it(('should return non-completed todos when ' +
        'showCompleted is false'), () => {

      const  filteredTodos = TodoAPI
          .filterTodos(todos, false, '');

      expect(filteredTodos.length).toBe(1);
    });

    it('should sort by completed status', () => {

      const  filteredTodos = TodoAPI
          .filterTodos(todos, true, '');

      expect(filteredTodos[0].completed).toBe(false);
    });

    it('should filter todos by searchText', () => {

      const  filteredTodos = TodoAPI
          .filterTodos(todos, true, 'some');

      expect(filteredTodos.length).toBe(2);
    });

    it('should return all todos if searchText is empty',
        () => {

      const  filteredTodos = TodoAPI
          .filterTodos(todos, true, '');
          
      expect(filteredTodos.length).toBe(3);
    });
  });
});
