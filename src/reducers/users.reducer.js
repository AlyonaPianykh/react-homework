import cloneDeep from 'lodash/cloneDeep';

import {
  GET_USERS,
  LOADING_USERS_END,
  LOADING_USERS_START,
} from '../action-types';

//todo обратите внимание, добавлено доставание начального значения стейта из локал стореджа
let initialState = {
  usersList: [],
  isLoading: false,
  totalPages: 0,
  page: 1,
  totalResult: 0,
  perPage: 6
};
const usersListObjectString = localStorage.getItem('usersList');

let usersListObject = {};
try {
  usersListObject = JSON.parse(usersListObjectString);
} catch (e) {
  console.log('error in parsing json');
}
const {usersList: usersListObj, date} = usersListObject;
if (date) {
  const date1 = new Date();
  const date2 = new Date(date);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / 1000);
  console.log('diffDays', diffDays);

  if (diffDays < 30 && usersListObj.usersList && usersListObj.usersList.length) {
    initialState = usersListObj;
  }
}

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
        const {payload} = action;

        return {
          ...state,
          ...payload
        };
      }
    case LOADING_USERS_START:{
      return {
        ...state,
        isLoading: true
      };
    }
    case LOADING_USERS_END:{
      return {
        ...state,
        isLoading: false
      };
    }
    default:
      return state;
  }
};
