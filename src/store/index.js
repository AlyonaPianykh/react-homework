import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import createRootReducer from '../reducers';
import { saveUsersToLocalStorage } from '../middlewares';


export const store = createStore(createRootReducer(), compose(applyMiddleware(thunk), applyMiddleware(saveUsersToLocalStorage), composeWithDevTools()));