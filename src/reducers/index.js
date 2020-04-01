import { combineReducers } from 'redux';
import { counterReducer } from './counter.reducer';
import { postsReducer } from './posts.reducer';
import { usersReducer } from './users.reducer';

export default () => {
  return combineReducers({
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
  });
}