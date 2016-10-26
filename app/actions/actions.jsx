import firebase, {firebaseRef, githubProvider}
    from 'app/firebase/';

import moment from 'moment';


export const setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};


export const toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};


export const addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};


export const startAddTodo = (text) => {
  return (dispatch, getState) => {

    const todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };

    const todoRef = firebaseRef.child('todos').push(todo);

    return todoRef.then(() => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }));
    });
  };
};


export const addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  };
};


export const startAddTodos = () => {

  return (dispatch, getState) => {
    const todosRef = firebaseRef.child('todos');

    return todosRef.once('value').then((snapshot) => {
      const todos = snapshot.val() || {};
      const parsedTodos = [];

      Object.keys(todos).forEach((todoId) => {
        parsedTodos.push({
          id: todoId,
          ...todos[todoId]
        });
      });

      dispatch(addTodos(parsedTodos));
    });
  };
};


export const updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  };
};


export const startToggleTodo = (id, completed) => {

  return (dispatch, getState) => {

    const todoRef = firebaseRef.child(`todos/${id}`);

    const updates= {
      completed,
      completedAt: completed ? moment().unix() : null
    };

    return todoRef.update(updates).then(() => {
      dispatch(updateTodo(id, updates));
    });
  };
};


export const startLogin = () => {

  return (dispatch, getState) => {

    return firebase.auth().signInWithPopup(githubProvider)
        .then((result) => {

      console.log('Auth worked!', result);

    }, (error) => {
      console.log('Unable to auth', error);
    });
  };
};


export const startLogout = () => {
  return (dispatch, getState) => {

    return firebase.auth().signOut().then(() => {
      console.log('Logged Out!');
    })
  };
};
