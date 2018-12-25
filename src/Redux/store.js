import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
/*=================
    store.jsx
  中央数据处理器
==================*/
var store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
