const actions                 = require('actions');
const createMockStore         = configureMockStore([thunk]);
const expect                  = require('expect');

import configureMockStore from 'redux-mock-store';
import firebase, {firebaseRef} from 'app/firebase';
import thunk from 'redux-thunk';


describe('Actions', () => {

  it('should generate search text action', () => {
    const action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };

    const res = actions.setSearchText(action.searchText);
    expect(res).toEqual(action);
  });


  it('should generate toggle show completed action',
      () => {

    const action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };

    const res = actions.toggleShowCompleted();
    expect(res).toEqual(action);
  });


  it('should generate add todo action', () => {

    const action = {
      type: 'ADD_TODO',
      todo: {
        id: '123abc',
        text: 'Anything we like',
        completed: false,
        createdAt: 0
      }
    };

    const res = actions.addTodo(action.todo);
    expect(res).toEqual(action);
  });


  it('should create todo and dispatch ADD_TODO',
      (done) => {

    const store = createMockStore({});
    const todoText = 'My todo item';

    store.dispatch(actions.startAddTodo(todoText))
        .then(() => {

      const actions = store.getActions();

      expect(actions[0]).toInclude({
        type: 'ADD_TODO'
      });

      expect(actions[0].todo).toInclude({
        text: todoText
      });

      done();
    }).catch(done);
  });


  it('should generate add todos action object', () => {

    const todos = [{
      id: '111',
      text: 'anything',
      completed: false,
      completedAt: undefined,
      createdAt: 33000
    }];

    const action = {
      type: 'ADD_TODOS',
      todos
    };

    const res = actions.addTodos(todos);
    expect(res).toEqual(action);
  });


  it('should generate update todo action', () => {

    const action = {
      type: 'UPDATE_TODO',
      id: '123',
      updates: {completd: false}
    };

    const res = actions
        .updateTodo(action.id, action.updates);

    expect(res).toEqual(action);
  });


  it('should generate login action object', () => {

    const action = {
      type: 'LOGIN',
      uid: '123abc'
    };

    const res = actions.login(action.uid);

    expect(res).toEqual(action);
  });


  it('should generate logout action object', () => {

    const action = {
      type: 'LOGOUT'
    };

    const res = actions.logout();

    expect(res).toEqual(action);
  });

  describe('Tests with firebase todos', () => {
    let testTodoRef;

    beforeEach((done) => {
      const todosRef = firebaseRef.child('todos');

      todosRef.remove().then(() => {
        testTodoRef = firebaseRef.child('todos').push();

        return testTodoRef.set({
          text: 'Something to do',
          completed: false,
          createdAt: 654645
        });
      })
      .then(() => done())
      .catch(done);
    });


    afterEach((done) => {
      testTodoRef.remove().then(()=> done());
    });


    it('should toggle todo & dispatch UPDATE_TODO action',
        (done) => {

      const store = createMockStore({});

      const action = actions
          .startToggleTodo(testTodoRef.key, true);

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0]).toInclude({
          type: 'UPDATE_TODO',
          id: testTodoRef.key
        });

        expect(mockActions[0].updates).toInclude({
          completed: true
        });

        expect(mockActions[0].updates.completedAt)
            .toExist();

        done();
      }, done);
    });


    it('should populate todos & dispatch ADD_TODOS',
        (done) => {

      const store = createMockStore({});
      const action = actions.startAddTodos();

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0].type)
            .toEqual('ADD_TODOS');

        expect(mockActions[0].todos.length).toEqual(1);

        expect(mockActions[0].todos[0].text)
            .toEqual('Something to do');

        done();
      }, done);
    });
  });
});
