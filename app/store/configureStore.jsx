import * as redux from 'redux';
import thunk from 'redux-thunk';

import {searchTextReducer, showCompletedReducer,
  todosReducer} from 'reducers';

export const configure = (initialState = {}) => {

  const reducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer
  });

  const store = redux.createStore(reducer, initialState,
      redux.compose(redux.applyMiddleware(thunk),
        window.devToolsExtension ?
          window.devToolsExtension() : f => f
  ));

  return store;
};
