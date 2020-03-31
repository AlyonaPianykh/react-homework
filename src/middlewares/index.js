import { GET_USERS } from '../action-types';

export const saveUsersToLocalStorage = store => next => action => {
  console.log('dispatching', action);

  if (action.type === GET_USERS) {
    const { payload } = action;
    let dataForStorage = '{}';
    try {
      dataForStorage = JSON.stringify({
        date: new Date(),
        usersList: payload
      });
    } catch(e) {
      console.log('error happened while stringifying');
    }
    localStorage.setItem('usersList', dataForStorage);
  }

  return next(action);
};
